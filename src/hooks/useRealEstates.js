import { useState, useEffect } from "react";

import { getRealEstates } from "@/services/realEstatesService";

const useRealEstates = () => {
  const [realEstates, setRealEstates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRealEstates = async () => {
      try {
        const data = await getRealEstates();
        setRealEstates(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchRealEstates();
  }, []);

  return { realEstates, loading, error };
};

export default useRealEstates;
