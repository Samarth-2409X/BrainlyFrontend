import { BACKEND_URL } from "../Config";
import { DeleteIcon } from "../Icons/deleteIcon";
import { DocumentIcon } from "../Icons/DocumentIcon";
import { DocumentIcon2 } from "../Icons/DocumentIcon2";
import { LinksIcon } from "../Icons/LinkIcon ";
import { LinksIcon2 } from "../Icons/LinkIcon2";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { YouTubeIcon } from "../Icons/YoutubeIcon";
import { format } from "date-fns";
import axios from "axios";
import { useEffect } from "react";

interface Tag {
  _id: string;
  title: string;
}

interface CardProps {
  id: string;
  title: string;
  link: string;
  tags: Tag[];
  type: "youtube" | "twitter" | "document" | "link";
  onDelete?: (id: string) => void;
}

function getYouTubeEmbedLink(url: string): string {
  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([^&?/]+)/;
  const match = url.match(regExp);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
}

export function Card({ id, title, link, tags, type, onDelete }: CardProps) {

  useEffect(() => {
    // Ensure Twitter embeds are rendered after component mounts
    // @ts-ignore
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    }
  }, [link]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: { ContentId: id },
      });

      if (onDelete) {
        onDelete(id);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div>
      <div className="p-6 bg-white rounded-2xl border border-gray-300 max-w-md min-w-[18rem] min-h-[12rem]">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <a href={link} target="_blank" className="text-gray-500">
              {type === "youtube" && <YouTubeIcon />}
              {type === "twitter" && <TwitterIcon />}
              {type === "document" && <DocumentIcon />}
              {type === "link" && <LinksIcon />}
            </a>
            <span className="font-medium">{title}</span>
          </div>
          <div
            className="text-gray-500 cursor-pointer"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </div>
        </div>

        <div className="pt-3">
          <a
            href={link}
            target="_blank"
            className="text-purple-600 underline block mb-2"
          >
            Go to the original link
          </a>

          {/* YouTube Embed */}
          {type === "youtube" && (
            <div className="w-full relative pt-[56.25%] mb-2">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={getYouTubeEmbedLink(link)}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Twitter Embed */}
          {type === "twitter" && (
            <div className="w-full flex justify-center mt-2">
              <div className="w-full max-w-full text-center">
                <blockquote
                  className="twitter-tweet mx-auto"
                  data-dnt="true"
                  data-theme="light"
                  style={{ margin: "0 auto", textAlign: "center" }}
                >
                  <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>
              </div>
            </div>
          )}

          {/* Document */}
          {type === "document" && (
            <div className="flex justify-center items-center text-sm text-blue-600 underline mt-2">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <DocumentIcon2 />
              </a>
            </div>
          )}

          {/* Link */}
          {type === "link" && (
            <div className="flex justify-center items-center text-sm text-blue-600 underline mt-2">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <LinksIcon2 />
              </a>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mt-3">
          {tags?.map((tag) => (
            <span
              key={tag._id}
              className="px-2 py-1 bg-purple-200 text-purple-600 text-sm rounded-3xl"
            >
              #{tag.title}
            </span>
          ))}
        </div>

        <div className="text-xs text-gray-500 mt-4">
          Created at: {format(new Date(), "dd MMM yyyy")}
        </div>
      </div>
    </div>
  );
}
