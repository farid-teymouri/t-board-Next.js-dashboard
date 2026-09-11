export type RightNowPoint = {
  timestamp: string;
  value: number;
};

export type RightNowGoal = {
  id: "newsletter" | "demo" | "checkout";
  value: number;
};

export type RightNowResponse = {
  currentValue: number;
  timestamp: string;
  points: RightNowPoint[];
  goals: RightNowGoal[];
};
