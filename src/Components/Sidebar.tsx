import { useState } from "react";
import { DocumentIcon } from "../Icons/DocumentIcon";
import { LinksIcon } from "../Icons/LinkIcon ";
import { Logo } from "../Icons/Logo";
import { NotesIcon } from "../Icons/NotesIcon";
import { TagsIcon } from "../Icons/TagsIcon";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { YouTubeIcon } from "../Icons/YoutubeIcon";
import { Button } from "./Button";
import { SidebarItems } from "./SidebarItem";

interface SidebarProps {
  onSelect: (type: string) => void;
}

export function Sidebar({ onSelect }: SidebarProps) {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6 flex flex-col justify-between">
      
      <div>
        <div className="flex text-2xl pt-4 items-center">
          <div className="pr-2">
            <Logo />
          </div>
          <div className="flex justify-center items-center font-bold text-xl pb-2">
            <p className="bg-gradient-to-r from-purple-600 via-purple-500 to-gray-400 bg-clip-text text-transparent">
              Second Brain
            </p>
          </div>
        </div>

        
        <div className="pt-4 pl-4">
          <SidebarItems text="All Cards" Icon={<NotesIcon />} onClick={() => onSelect("all")} />
          <SidebarItems text="Tweets" Icon={<TwitterIcon />} onClick={() => onSelect("twitter")} />
          <SidebarItems text="Videos" Icon={<YouTubeIcon />} onClick={() => onSelect("youtube")} />
          <SidebarItems text="Documents" Icon={<DocumentIcon />} onClick={() => onSelect("document")} />
          <SidebarItems text="Links" Icon={<LinksIcon />} onClick={() => onSelect("link")} />
          <SidebarItems text="Tags" Icon={<TagsIcon />} onClick={() => onSelect("tags")} />
        </div>
      </div>

      
      <div className="p-4 relative pl-6">
        <Button text="Log out" variant="Primary" onClick={() => setShowLogout(!showLogout)} />

        
        {showLogout && (
          <div className="absolute bottom-full mb-2 left-0 w-full bg-white border border-gray-300 rounded-xl shadow-lg p-4 text-center z-10">
            <p className="mb-3 text-sm font-medium">Are you sure?</p>
            <div className="flex justify-center gap-2">
              <button
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                onClick={handleLogout}
              >
                Yes
              </button>
              <button
                className="px-3 py-1 bg-gray-300 text-black rounded-lg hover:bg-gray-400 text-sm"
                onClick={() => setShowLogout(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
