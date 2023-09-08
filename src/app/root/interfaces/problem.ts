export interface Problem {
  contestId: number;
  index: string;
  name: string;
  tags: string[];
  points: number;
  solveCount: number;
  link: string;
  isSolved?:boolean;
}
