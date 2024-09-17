import { useState, useEffect } from "react";

import { getRealEstate } from "@/services/realEstatesService";

const useRealEstate = (id) => {
  const [realEstate, setRealEstate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRealEstate = async (id) => {
      try {
        const data = await getRealEstate(id);
        setRealEstate(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchRealEstate(id);
  }, []);

  return { realEstate, loading, error };
};

export default useRealEstate;
