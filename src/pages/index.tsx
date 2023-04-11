import { useCallback, useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import type { Task } from "@/utils/types";

import Queue from "@/components/Queue";
import VideoForm from "@/components/VideoForm";

const Home: NextPage = () => {
  const [apiKey, setAPIKey] = useState<string>();
  const [queue, setQueue] = useState<Task[]>([]);

  const addToQueue = useCallback((newTasks: Task[]) => {
    return setQueue((tasks) => [...tasks, ...newTasks]);
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

          <label className="text-xs font-medium text-white/60">
            OpenAI API key
          </label>

          <input
            type="text"
            placeholder="OpenAI API key"
            className="light_border block w-full bg-dark px-4 py-2 text-white"
            onChange={(evt) => setAPIKey(evt.target.value)}
          />

          <div className="light_border my-6" />

          <VideoForm addToQueue={addToQueue} />

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
