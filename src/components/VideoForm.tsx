import { useForm, SubmitHandler } from "react-hook-form";
import { nanoid } from "nanoid";
import ytdl from "ytdl-core";
import type { Task } from "@/utils/types";

type Props = {
  addToQueue: (newTasks: Task[]) => unknown;
};

type Inputs = {
  videoName: string;
  videoUrl: string;
};

const VideoForm = ({ addToQueue }: Props) => {
  const { register, handleSubmit, reset, setError, formState } =
    useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (values) => {
    if (!ytdl.validateURL(values.videoUrl)) {
      return setError("videoUrl", { type: "custom", message: "Invalid URL." });
    }

    const videoId = ytdl.getVideoID(values.videoUrl);

    const newTask: Task = {
      videoId,
      id: nanoid(),
      videoName: values.videoName || values.videoUrl,
      processing: true,
      done: false,
      step: 1,
    };

    addToQueue([newTask]);
    return reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="mb-2">
          <label className="text-xs font-medium text-white/60">
            Video name
          </label>

          <input
            type="text"
            placeholder="Name of the YouTube video"
            className="light_border block w-full bg-dark px-4 py-2 text-white"
            {...register("videoName")}
          />
        </fieldset>

        <fieldset className="mb-4">
          <label className="text-xs font-medium text-white/60">Video URL</label>

          <input
            type="text"
            placeholder="URL of the YouTube video"
            className="light_border block w-full bg-dark px-4 py-2 text-white"
            {...register("videoUrl")}
          />

          {formState.errors.videoUrl ? (
            <p className="mt-1 px-1 text-xs text-red-500">
              {formState.errors.videoUrl.message}
            </p>
          ) : (
            <p className="mt-1 px-1 text-xs text-white/60">
              Remember to include http:// or https://
            </p>
          )}
        </fieldset>

        <button className="light_border w-full bg-blue-600 py-1 font-medium text-white transition-colors duration-150 ease-linear hover:bg-blue-800">
          Transcribe
        </button>
      </form>
    </>
  );
};

export default VideoForm;
