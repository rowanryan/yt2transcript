import type { Task } from "@/utils/types";

import {
  IconTrashFilled,
  IconLoader2,
  IconChecks,
  IconReload,
} from "@tabler/icons-react";

type Props = {
  queue: Task[];
  retry: (task?: Task) => unknown;
  removeFromQueue: (id: string) => unknown;
};

const Queue = ({ queue, removeFromQueue, retry }: Props) => {
  return (
    <>
      <div className="light_border">
        {queue.length < 1 ? (
          <div className="px-4 py-6">
            <p className="text-center text-sm text-white/70">
              No videos have been added yet...
            </p>
          </div>
        ) : (
          <table className="w-full table-auto">
            <tbody className="w-full divide-y divide-white/10">
              {queue.map((task, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">
                    <a
                      href={`https://www.youtube.com/watch?v=${task.videoId}`}
                      target="_blank"
                      className="group text-sm"
                    >
                      <p className="text-xs text-white/60">
                        ID: {task.videoId}
                      </p>

                      <p className="w-56 truncate font-medium text-white transition-colors duration-150 ease-linear group-hover:text-blue-500 md:w-auto">
                        {task.videoName}
                      </p>

                      {task.processing && (
                        <p className="mt-1 text-xs text-orange-400">
                          {task.step === 1
                            ? "Downloading audio..."
                            : "Transcribing audio through Whisper..."}
                        </p>
                      )}

                      {task.error && (
                        <p className="mt-1 text-xs text-red-500">
                          {task.error}
                        </p>
                      )}
                    </a>
                  </td>

                  <td align="right" className="px-4 py-3">
                    {task.done ? (
                      <div className="p-1">
                        <IconChecks size={16} className="text-green-500" />
                      </div>
                    ) : task.processing ? (
                      <div className="p-1">
                        <IconLoader2
                          size={16}
                          className="animate-spin text-white"
                        />
                      </div>
                    ) : task.error ? (
                      <button
                        className="light_border bg-dark p-1 text-sm text-white transition-colors duration-150 ease-linear hover:bg-white hover:text-dark"
                        onClick={() => retry(task)}
                      >
                        <IconReload size={14} />
                      </button>
                    ) : (
                      <button
                        className="light_border bg-dark p-1 text-sm text-white transition-colors duration-150 ease-linear hover:bg-white hover:text-dark"
                        onClick={() => removeFromQueue(task.id)}
                      >
                        <IconTrashFilled size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Queue;
