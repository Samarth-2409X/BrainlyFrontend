// src/hooks/useTags.ts
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../Config";
import axios from "axios";

export interface Tag {
  _id: string;
  title: string;
}

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/tags`)
      .then((res) => {
        setTags(res.data.tags);
      })
      .catch((err) => console.error("Error fetching tags:", err))
      .finally(() => setLoading(false));
  }, []);

  return { tags, loading };
}
