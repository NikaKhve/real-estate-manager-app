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
  region_id: z.string(),
  city_id: z.string(),
  agent_id: z.string(),
  price: z.number({
    required_error: "ფასი არის აუცილებელი ველი",
    invalid_type_error: "ფასი არის აუცილებელი ველი",
  }),
  area: z.number({
    required_error: "ფართობი არის აუცილებელი ველი",
    invalid_type_error: "ფართობი არის აუცილებელი ველი",
  }),
  bedrooms: z
    .number({
      required_error: "საძინებლების რაოდენობა არის აუცილებელი ველი",
      invalid_type_error: "საძინებლების რაოდენობა არის აუცილებელი ველი",
    })
    .int("საძინებლების რაოდენობა უნდა იყოს მთელი რიცხვი"),
  description: z
    .string()
    .min(1)
    .refine((value) => value.split(/\s+/).filter(Boolean).length >= 5, {
      message: "აღწერა უნდა შეიცავდეს მინიმუმ 5 სიტყვას",
    }),
  image: z
    .instanceof(File, "ფაილი არის აუცილებელი ველი")
    .refine((file) => !!file && file.size > 0, "სურათი აუცილებელია")
    .refine((file) => {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      return validTypes.includes(file.type);
    }, "სურათის გაფართოება არასწორია, ატვირთეთ .jpg .png .gif ფორმატის ფაილები")
    .refine((file) => {
      return file.size <= 1 * 1024 * 1024;
    }, "ფაილის ზომა არ უნდა აღემატებოდეს 1 მბ-ს"),
});
