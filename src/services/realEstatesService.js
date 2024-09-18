import axiosInstance from "@/lib/axiosInstance";

export const getRealEstates = async () => {
  const { data } = await axiosInstance.get("/real-estates");
  return data;
};

export const getRealEstate = async (id) => {
  const { data } = await axiosInstance.get(`/real-estates/${id}`);
  return data;
};

export const getAllRegions = async () => {
  const { data } = await axiosInstance.get("/regions");
  return data;
};

export const getAllCities = async () => {
  const { data } = await axiosInstance.get("/cities");
  return data;
};

export const getAllAgents = async () => {
  const { data } = await axiosInstance.get("/agents");
  return data;
};
