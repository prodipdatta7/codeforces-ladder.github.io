export interface Problem {
  id: number;
  index: string;
  name: string;
  points: number;
  tags: string;
  solveCount: number;
  link: string;
  isSolved?:boolean;
}
