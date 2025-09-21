import { useEffect, useState } from "react";
import { BACKEND_URL } from "../Config";
import axios from "axios";

interface Tag {
  _id: string;
  title: string;
}

interface Content {
  _id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter";
  tags: Tag[];
}

export function useContent() {
  const [contents, setContent] = useState<Content[]>([]);

  async function refresh() {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });
      setContent(response.data.content);
    } catch (error) {
      console.error("Failed to fetch content:", error);
    }
  }

  useEffect(() => {
    refresh(); 
    const interval = setInterval(refresh, 1 * 1000); 

    return () => clearInterval(interval); 
  }, []);

  return { contents, setContent, refresh };
}
