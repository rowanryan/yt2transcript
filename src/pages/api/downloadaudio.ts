import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import ytdl from "ytdl-core";
import { Task } from "@/utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const task: Task = req.body;

  try {
    const folder = "./audio";
    const file = `${task.videoId}.webm`;
    const output = path.join(folder, file);

    await new Promise((resolve) => {
      ytdl(task.videoId, {
        filter: (format) => format.container === "webm" && format.hasAudio,
        quality: "lowestaudio",
      })
        .pipe(fs.createWriteStream(output))
        .on("close", () => {
          resolve(true);
        });
    });

    return res.status(200).json({ ok: true, file });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error });
  }
}
