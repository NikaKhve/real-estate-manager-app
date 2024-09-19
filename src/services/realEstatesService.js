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

export const createNewListing = async (payload) => {
  const formData = new FormData();

  Object.keys(payload).forEach((key) => {
    let value = payload[key];

    if (key === "region_id" || key === "city_id" || key === "agent_id") {
      value = value ? parseInt(value, 10) : "";
    }

    if (key === "image" && value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  try {
    const { data } = await axiosInstance.post("/real-estates", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.error("Error creating new listing:", error.response?.data || error);
    throw error;
  }
};

export const deleteListing = async (id) => {
  const { data } = await axiosInstance.delete(`real-estates/${id}`);
  return data;
};

export const createNewAgent = async (payload) => {
  const formData = new FormData();
  console.log(payload, "PAYLOAD");

  Object.keys(payload).forEach((key) => {
    let value = payload[key];

    // if (key === "region_id" || key === "city_id" || key === "agent_id") {
    //   value = value ? parseInt(value, 10) : "";
    // }

    if (key === "avatar" && value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  try {
    const { data } = await axiosInstance.post("/agents", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.error("Error creating new listing:", error.response?.data || error);
    throw error;
  }
};
