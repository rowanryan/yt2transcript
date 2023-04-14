import type { GeneratedText } from "@/utils/types";

import { IconDownload } from "@tabler/icons-react";

type Props = {
  output: GeneratedText[];
};

const Output = ({ output }: Props) => {
  const downloadText = (id: string, videoId: string, text: string) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.download = `${videoId}_${id}.txt`;
    link.href = url;

    return link.click();
  };

  return (
    <>
      <div className="light_border">
        {output.length < 1 ? (
          <div className="px-4 py-6">
            <p className="text-center text-sm text-white/70">
              No text has been generated yet...
            </p>
          </div>
        ) : (
          <table className="w-full table-auto">
            <tbody className="w-full divide-y divide-white/10">
              {output.map((generatedText, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">
                    <a
                      href={`https://www.youtube.com/watch?v=${generatedText.task.videoId}`}
                      target="_blank"
                      className="group text-sm"
                    >
                      <p className="text-xs text-white/60">
                        ID: {generatedText.task.videoId}
                      </p>

                      <p className="w-56 truncate font-medium text-white transition-colors duration-150 ease-linear group-hover:text-blue-500 md:w-auto">
                        {generatedText.task.videoName}
                      </p>
                    </a>
                  </td>

                  <td align="right" className="px-4 py-3">
                    <button
                      className="light_border bg-dark p-1 text-sm text-white transition-colors duration-150 ease-linear hover:bg-white hover:text-dark"
                      onClick={() =>
                        downloadText(
                          generatedText.task.id,
                          generatedText.task.videoId,
                          generatedText.text
                        )
                      }
                    >
                      <IconDownload size={14} />
                    </button>
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

export default Output;
