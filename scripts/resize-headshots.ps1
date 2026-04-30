# Resize team-photos/<number> - <name>.jpg headshots to public/players/<number>.jpg.
# Square-cropped from the top (since portraits put the face in the upper portion),
# scaled to 256x256, saved as JPEG at quality 82. One-time use; the originals are
# gitignored.

param(
  [string]$Source = "team-photos",
  [string]$Dest = "public/players",
  [int]$Size = 256,
  [int]$Quality = 82
)

Add-Type -AssemblyName System.Drawing

$sourceDir = Resolve-Path $Source
$destDir = Resolve-Path $Dest

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, [int64]$Quality
)

$processed = 0
$skipped = 0

Get-ChildItem -Path $sourceDir -Filter "*.jpg" | ForEach-Object {
  $file = $_
  $match = [regex]::Match($file.Name, '^(\d+)\s*-\s*')
  if (-not $match.Success) {
    Write-Host "skip (no number): $($file.Name)"
    $skipped++
    return
  }

  $number = [int]$match.Groups[1].Value
  $outPath = Join-Path $destDir "$number.jpg"

  $img = $null
  $cropped = $null
  $resized = $null
  try {
    $img = [System.Drawing.Image]::FromFile($file.FullName)

    # Honor EXIF orientation so iPhone-rotated photos come out upright.
    $orientationProp = $null
    if ($img.PropertyIdList -contains 0x0112) {
      $orientationProp = $img.GetPropertyItem(0x0112)
    }
    if ($orientationProp) {
      switch ($orientationProp.Value[0]) {
        3 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
        6 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
        8 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
      }
    }

    $w = $img.Width
    $h = $img.Height
    $square = [Math]::Min($w, $h)

    # Top-aligned crop for portraits (face is high in the frame),
    # center-aligned for landscape.
    $x = [int](($w - $square) / 2)
    $y = if ($h -gt $w) { 0 } else { [int](($h - $square) / 2) }

    $rect = New-Object System.Drawing.Rectangle($x, $y, $square, $square)
    $cropped = New-Object System.Drawing.Bitmap($square, $square)
    $g1 = [System.Drawing.Graphics]::FromImage($cropped)
    $g1.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $square, $square)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g1.Dispose()

    $resized = New-Object System.Drawing.Bitmap($Size, $Size)
    $g2 = [System.Drawing.Graphics]::FromImage($resized)
    $g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g2.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g2.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g2.DrawImage($cropped, 0, 0, $Size, $Size)
    $g2.Dispose()

    $resized.Save($outPath, $jpegCodec, $encoderParams)
    $processed++
    Write-Host "ok #$number -> $outPath"
  }
  catch {
    Write-Host "ERROR $($file.Name): $_"
    $skipped++
  }
  finally {
    if ($resized) { $resized.Dispose() }
    if ($cropped) { $cropped.Dispose() }
    if ($img) { $img.Dispose() }
  }
}

Write-Host ""
Write-Host "Processed: $processed"
Write-Host "Skipped: $skipped"
