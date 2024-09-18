import { z } from "zod";

export const useAddNewListingSchema = z.object({
  is_rental: z.string(),
  address: z
    .string()
    .min(2, "მისამართი უნდა შედგებოდეს მინიმუმ 2 სიმბოლოსგან")
    .refine((value) => /[a-zA-Zა-ჰ]/.test(value), {
      message: "მისამართი არ უნდა იყოს მხოლოდ ციფრები",
    }),
  zip_code: z
    .number({
      required_error: "საფოსტო ინდექსი არის აუცილებელი ველი",
      invalid_type_error: "საფოსტო ინდექსი არის აუცილებელი ველი",
    })
    .min(1, "საფოსტო ინდექსი არის აუცილებელი ველი"),
});
