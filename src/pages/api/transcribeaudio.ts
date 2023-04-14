import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import openai from "@/lib/openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const file: string = req.body;

  try {
    const folder = "./audio";
    const input = path.join(folder, file);

    const resp = await openai.createTranscription(
      fs.createReadStream(input),
      "whisper-1"
    );

    fs.rmSync(input, {
      force: true,
    });

    return res.status(200).json({ ok: true, text: resp.data.text });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error });
  }
}
