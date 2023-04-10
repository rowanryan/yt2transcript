export type Task = {
  id: string;
  videoName: string;
  videoId: string;
  processing: boolean;
  done: boolean;
  step: 1 | 2;
};
