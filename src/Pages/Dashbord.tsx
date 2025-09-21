import { Button } from "../Components/Button"
import { PluseIcon } from "../Icons/PluseIcon"
import { ShareIcon } from "../Icons/ShareIcon"
import { Card } from "../Components/Card"
import { CreateContentmodel } from "../Components/CreateContentModel"
import { useState, useEffect } from "react"
import { Sidebar } from "../Components/Sidebar"
import { useContent } from "../hooks/useContent"
import { BACKEND_URL } from "../Config"
import { ShareModal } from "../Components/ShareButtonModel"
import axios from "axios";

interface Tag {               
  _id: string;
  title: string;
}

interface DashbordProps {
  isShared?: boolean;
}


export function Dashbord({ isShared = false }: DashbordProps) {


  const [modelOpen, setModelOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const [tags, setTags] = useState<Tag[]>([]); 

  const { contents, setContent } = useContent();

  
  const filteredContents = selectedType === "all"
      ? contents
      : selectedType === "tags"
      ? contents
      : contents.filter((c) => c.type === selectedType);

    useEffect(() => {
      if (selectedType === "tags") {
        axios
          .get(`${BACKEND_URL}/api/v1/tags`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => setTags(res.data.tags))
          .catch((err) => console.error(err));
      }
    }, [selectedType]);

  return (

    <div className="">
      <Sidebar onSelect={setSelectedType} />
      <div className="p-5 ml-72 min-h-screen bg-gray-100 border-2">

        {!isShared && (
          <CreateContentmodel
            open={modelOpen}
            onClose={() => setModelOpen(false)}
          />
        )}

        {!isShared && (
          <ShareModal
            isOpen={shareModalOpen}
            onClose={() => setShareModalOpen(false)}
          />
        )}


        <div className="flex justify-between w-full gap-2">
          <div className="font-bold text-2xl pl-2">
            {selectedType === "tags" ? "Tags" : "All Cards"}
          </div>

          {!isShared && (
            <div className="flex gap-2 pb-3">
              <Button
                onClick={() => setModelOpen(true)}
                variant="Primary"
                text="Add Content"
                startIcon={<PluseIcon />}
              />
              <Button
                onClick={() => setShareModalOpen(true)} 
                variant="Secondary"
                text="Share Brain"
                startIcon={<ShareIcon />}
              />
            </div>
          )}
        </div>

         {selectedType === "tags" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
            {tags.map((tag) => (
              <div
                key={tag._id}
                className="bg-white border rounded-3xl p-3 shadow hover:bg-gray-100 cursor-pointer"
              >
                {tag.title}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
            {filteredContents.map(({ _id, type, link, tags, title }) => (
              <Card
                key={_id}
                id={_id}
                type={type}
                title={title}
                link={link}
                tags={tags}
                onDelete={(id) => {
                  setContent((prev) => prev.filter((c) => c._id !== id));
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashbord;