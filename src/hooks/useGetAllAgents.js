import { useState, useEffect } from "react";

import { getAllAgents } from "@/services/realEstatesService";

const useGetAllAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllAgents = async () => {
      try {
        const data = await getAllAgents();
        setAgents(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAgents();
  }, []);

  return { agents, loading, error };
};

export default useGetAllAgents;
