import { useState, useEffect } from "react";

import { getAllRegions } from "@/services/realEstatesService";

const useGetAllRegions = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllRegions = async () => {
      try {
        const data = await getAllRegions();
        setRegions(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRegions();
  }, []);

  return { regions, loading, error };
};

export default useGetAllRegions;
