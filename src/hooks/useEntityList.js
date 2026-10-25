import { useCallback, useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

export default function useEntityList(entity, sort = "-created_date") {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    const page = await base44.entities[entity].list({ sort, limit: 200 });
    setItems(page.items);
    setLoading(false);
  }, [entity, sort]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { items, loading, reload };
}