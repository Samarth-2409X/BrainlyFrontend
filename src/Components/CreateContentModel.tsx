import { useRef, useState } from "react";
import { Crossicon } from "../Icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../Config";
import axios from "axios";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Document = "document",
  Link = "link",
}

export function CreateContentmodel({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);

  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const tagsInput = tagsRef.current?.value;
    const tags = tagsInput?.split(",").map((t) => t.trim()).filter(Boolean);

    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      {
        link,
        title,
        type,
        tags,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    onClose();
  }

  if (!open) return null; 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"> 
      
      <div
        className="absolute inset-0 bg-black bg-opacity-40" 
        onClick={onClose}
      />

      
      <div className="relative bg-white rounded-3xl p-6 w-full max-w-md z-50 shadow-lg"> 
        
        <div className="flex justify-end">
          <div
            onClick={onClose}
            className="cursor-pointer hover:text-gray-400"
          >
            <Crossicon />
          </div>
        </div>

        
        <div className="flex justify-center font-bold text-xl pb-4">
          <p className="bg-gradient-to-r from-purple-600 via-purple-500 to-gray-400 bg-clip-text text-transparent">
            Create Card
          </p>
        </div>

        
        <Input referance={titleRef} placeholder="Title" />
        <Input referance={linkRef} placeholder="Link" />
        <Input referance={tagsRef} placeholder="Tags (comma separated)" />

        
        <div className="pt-4">
          <h1 className="font-bold pl-4 pb-2">Type:</h1>
          <div className="flex gap-2 justify-between">
            <Button
              text="Youtube"
              variant={type === ContentType.Youtube ? "Primary" : "Secondary"}
              onClick={() => setType(ContentType.Youtube)}
            />
            <Button
              text="Twitter"
              variant={type === ContentType.Twitter ? "Primary" : "Secondary"}
              onClick={() => setType(ContentType.Twitter)}
            />

            <Button
              text="Document"
              variant={type === ContentType.Document ? "Primary" : "Secondary"}
              onClick={() => setType(ContentType.Document)}
            />
            
            <Button
              text="Link"
              variant={type === ContentType.Link ? "Primary" : "Secondary"}
              onClick={() => setType(ContentType.Link)}
            />
          </div>

        </div>

        
        <div className="flex justify-center mt-6">
          <Button onClick={addContent} variant="Primary" text="Submit" />
        </div>
        
      </div>
    </div>
  );
}
