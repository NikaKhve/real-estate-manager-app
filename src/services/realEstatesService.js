import axiosInstance from "@/lib/axiosInstance";

export const getRealEstates = async () => {
  const { data } = await axiosInstance.get("/real-estates");
  return data;
};
