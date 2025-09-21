import { Button } from "./Button";
import { Crossicon } from "../Icons/CrossIcon";
import axios from "axios";
import { BACKEND_URL } from "../Config";
import { CopyIcon } from "../Icons/CopyIcon";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  if (!isOpen) return null;

  const handleShare = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const shareUrl = `http://localhost:5173/share/${response.data.hash}`;

      
      await navigator.clipboard.writeText(shareUrl);

      
      
      onClose();
    } catch (error) {
      console.error("Error sharing brain:", error);
      alert("Failed to generate share link");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      />

      
      <div className="relative bg-white rounded-xl shadow-lg p-6 w-[400px] z-10">
        
        <div className="flex justify-between items-center">
          
          <h2 className="text-lg font-bold">Share Your Second Brain</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <Crossicon />
          </button>
        </div>

        
        <p className="mt-3 text-sm text-gray-600">
          Share your entire collection of notes, documents, tweets, and videos
          with others. They’ll be able to import your content into their own
          Second Brain.
        </p>

        
        <div className="mt-6">
          
          <Button
          startIcon={<CopyIcon />} 
            variant="Primary"
            text="Share Brain"
            fullWidth
            onClick={handleShare}
          />
        </div>

        
        <p className="mt-3 text-center text-xs text-gray-500">
          3 items will be shared
        </p>
      </div>
    </div>
  );
}
