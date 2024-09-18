import { z } from "zod";

export const useAddNewListingSchema = z.object({
  is_rental: z.string().min(1, "Is rental is required"),
  address: z.string().min(1, "Address is required"),
  zip_code: z.number().optional(),
  region_id: z.string().min(1, "Region is required"),
  city_id: z.string().min(1, "City is required"),
  price: z.number().optional(),
  area: z.number().optional(),
  bedrooms: z.number().optional(),
  description: z.string().min(5, "Description must be at least 5 words"),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      if (!file) return true;
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      return validTypes.includes(file.type);
    }, "Invalid file type")
    .refine((file) => {
      return file.size <= 5 * 1024 * 1024;
    }, "File size should be less than 5 MB"),
});
