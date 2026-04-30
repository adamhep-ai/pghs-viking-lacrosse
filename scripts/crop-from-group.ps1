# Crop a square region from a group photo and save it as a 256x256 JPEG.
#
# Usage:
#   ./scripts/crop-from-group.ps1 -Source "team-photos/Freshman.jpg" `
#       -OutPath "public/players/52.jpg" -CenterX 2700 -CenterY 2000 -CropSize 800
#
# CenterX/CenterY are in source-image pixels. CropSize is the side length
# (in source pixels) of the square region to extract; it gets scaled to
# 256x256.

param(
  [Parameter(Mandatory=$true)][string]$Source,
  [Parameter(Mandatory=$true)][string]$OutPath,
  [Parameter(Mandatory=$true)][int]$CenterX,
  [Parameter(Mandatory=$true)][int]$CenterY,
  [Parameter(Mandatory=$true)][int]$CropSize,
  [int]$OutSize = 256,
  [int]$Quality = 82
)

Add-Type -AssemblyName System.Drawing

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, [int64]$Quality
)

$img = [System.Drawing.Image]::FromFile((Resolve-Path $Source))

if ($img.PropertyIdList -contains 0x0112) {
  $orient = $img.GetPropertyItem(0x0112).Value[0]
  switch ($orient) {
    3 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
    6 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
    8 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
  }
}

$half = [int]($CropSize / 2)
$x = [Math]::Max(0, $CenterX - $half)
$y = [Math]::Max(0, $CenterY - $half)
$w = [Math]::Min($CropSize, $img.Width - $x)
$h = [Math]::Min($CropSize, $img.Height - $y)

$rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
$cropped = New-Object System.Drawing.Bitmap($w, $h)
$g1 = [System.Drawing.Graphics]::FromImage($cropped)
$g1.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
$g1.Dispose()

$resized = New-Object System.Drawing.Bitmap($OutSize, $OutSize)
$g2 = [System.Drawing.Graphics]::FromImage($resized)
$g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g2.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g2.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$g2.DrawImage($cropped, 0, 0, $OutSize, $OutSize)
$g2.Dispose()

# Make sure the destination dir exists.
$dir = Split-Path $OutPath -Parent
if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }

$resized.Save($OutPath, $jpegCodec, $encoderParams)

$cropped.Dispose()
$resized.Dispose()
$img.Dispose()

Write-Host "wrote $OutPath ($w x $h source -> $OutSize x $OutSize)"
