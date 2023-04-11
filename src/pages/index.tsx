import { useCallback, useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";
import { nanoid } from "nanoid";
import ytdl from "ytdl-core";
import type { Task } from "@/utils/types";

import Queue from "@/components/Queue";

type Inputs = {
  videoName: string;
  videoUrl: string;
};

const Home: NextPage = () => {
  const [apiKey, setAPIKey] = useState<string>();
  const [queue, setQueue] = useState<Task[]>([]);
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

    return addToQueue([newTask]);
  };

  const addToQueue = useCallback((newTasks: Task[]) => {
    setQueue((tasks) => [...tasks, ...newTasks]);

    return reset();
  }, []);

  const removeFromQueue = useCallback((id: string) => {
    return setQueue((tasks) => tasks.filter((task) => task.id !== id));
  }, []);

  return (
    <>
      <Head>
        <title>Youtube 2 Transcript</title>
      </Head>

      <main className="px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-[40rem]">
          <div className="mb-8">
            <h1 className="mb-2 text-center text-3xl font-bold text-white md:mb-3 md:text-5xl">
              YouTube 2 Transcript
            </h1>

            <h2 className="text-center font-semibold text-white/60 md:text-xl">
              Using OpenAI's Whisper API
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="mb-2">
              <label className="text-xs font-medium text-white/60">
                OpenAI API key
              </label>

              <input
                type="text"
                placeholder="OpenAI API key"
                className="light_border block w-full bg-dark px-4 py-2 text-white"
              />
            </fieldset>

            <div className="light_border mb-4 mt-6" />

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
              <label className="text-xs font-medium text-white/60">
                Video URL
              </label>

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

          <div className="light_border my-6 md:my-8" />

          <h3 className="mb-1 font-bold text-white md:text-lg">Queue</h3>
          <div className="mb-4 md:mb-8">
            <Queue queue={queue} removeFromQueue={removeFromQueue} />
          </div>

          <h3 className="mb-1 font-bold text-white md:text-lg">
            Generated text
          </h3>
          <div className="light_border px-4 py-6">
            <p className="text-center text-sm text-white/70">
              No text has been generated yet...
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
