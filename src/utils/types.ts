export type Task = {
  id: string;
  videoName: string;
  videoId: string;
  processing: boolean;
  done: boolean;
  step: 1 | 2;
  error?: string;
};

export type GeneratedText = {
  task: Task;
  text: string;
};
