// 2026 PGHS Viking Lacrosse roster.
//
// Position codes: A = Attack, M = Midfield, D = Defense, G = Goalie.
// Names normalized to title case from the printed roster.

export type Position = "A" | "M" | "D" | "G";

export type Player = {
  number: number;
  name: string;
  position: Position;
  grade: number;
};

export const POSITION_LABEL: Record<Position, string> = {
  A: "Attack",
  M: "Midfield",
  D: "Defense",
  G: "Goalie",
};

// Sorted by jersey number, matching the printed roster.
export const roster: Player[] = [
  { number: 0, name: "Liam Stott", position: "A", grade: 12 },
  { number: 2, name: "Travis McFadden", position: "M", grade: 12 },
  { number: 3, name: "Derek Brinton", position: "D", grade: 11 },
  { number: 4, name: "Grant Hepworth", position: "M", grade: 12 },
  { number: 5, name: "Quinn Lawrence", position: "A", grade: 10 },
  { number: 6, name: "Owen Sheriff", position: "M", grade: 10 },
  { number: 7, name: "Carston Carter", position: "A", grade: 12 },
  { number: 8, name: "Eli Moses", position: "D", grade: 12 },
  { number: 9, name: "Zack Williams", position: "D", grade: 9 },
  { number: 10, name: "Thomas James", position: "M", grade: 12 },
  { number: 11, name: "Myles Doman", position: "A", grade: 11 },
  { number: 12, name: "Ty Smith", position: "M", grade: 12 },
  { number: 13, name: "Korban Warner", position: "M", grade: 9 },
  { number: 14, name: "Luke Bills", position: "M", grade: 10 },
  { number: 15, name: "Brigham Smoot", position: "M", grade: 10 },
  { number: 16, name: "Miles Harrison", position: "D", grade: 10 },
  { number: 17, name: "Asher Bayles", position: "A", grade: 12 },
  { number: 18, name: "Peter Sandberg", position: "D", grade: 12 },
  { number: 19, name: "Josh Garlick", position: "M", grade: 12 },
  { number: 20, name: "Tucker Powell", position: "D", grade: 10 },
  { number: 21, name: "Daniel McMillan", position: "A", grade: 12 },
  { number: 22, name: "Blake Platt", position: "M", grade: 12 },
  { number: 23, name: "Brigham Adams", position: "M", grade: 10 },
  { number: 24, name: "Colton Braby", position: "M", grade: 12 },
  { number: 25, name: "Jake Bills", position: "M", grade: 10 },
  { number: 26, name: "RJ Hatfield", position: "A", grade: 9 },
  { number: 27, name: "Spencer Taggart", position: "G", grade: 11 },
  { number: 28, name: "Parker Boyer", position: "M", grade: 12 },
  { number: 29, name: "Myles Cox", position: "M", grade: 11 },
  { number: 30, name: "Davis Orton", position: "M", grade: 12 },
  { number: 31, name: "Keaton Anderson", position: "D", grade: 9 },
  { number: 32, name: "Henry Chipman", position: "M", grade: 11 },
  { number: 34, name: "Jackson Gurr", position: "M", grade: 9 },
  { number: 35, name: "Grayson Smoot", position: "G", grade: 9 },
  { number: 36, name: "Mikey Doman", position: "M", grade: 9 },
  { number: 37, name: "Sam Christensen", position: "M", grade: 10 },
  { number: 38, name: "Omar Villareal", position: "M", grade: 10 },
  { number: 39, name: "Easton Jeffs", position: "M", grade: 10 },
  { number: 40, name: "Gabe Leavitt", position: "M", grade: 12 },
  { number: 41, name: "Jakub Kuhnel", position: "M", grade: 12 },
  { number: 42, name: "Hayden Conder", position: "D", grade: 12 },
  { number: 43, name: "Davis Hepworth", position: "M", grade: 9 },
  { number: 44, name: "Deegan Ash", position: "M", grade: 11 },
  { number: 45, name: "Xander Evans", position: "D", grade: 11 },
  { number: 46, name: "Mason Nelson", position: "M", grade: 11 },
  { number: 47, name: "Hunter Reay", position: "A", grade: 11 },
  { number: 48, name: "Max Smart", position: "M", grade: 12 },
  { number: 49, name: "River Reeve", position: "M", grade: 11 },
  { number: 50, name: "Spencer Schultz", position: "M", grade: 11 },
  { number: 51, name: "Cade Whatcott", position: "M", grade: 10 },
  { number: 52, name: "Matthew Anderson", position: "D", grade: 9 },
  { number: 55, name: "Hank Fondren", position: "A", grade: 10 },
  { number: 60, name: "Archer Staley", position: "M", grade: 10 },
];
