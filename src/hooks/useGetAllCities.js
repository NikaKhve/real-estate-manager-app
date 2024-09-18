import { useState, useEffect } from "react";

import { getAllCities } from "@/services/realEstatesService";

const useGetAllCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllCities = async () => {
      try {
        const data = await getAllCities();
        setCities(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCities();
  }, []);

  return { cities, loading, error };
};

export default useGetAllCities;
