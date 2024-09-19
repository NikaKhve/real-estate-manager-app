import { z } from "zod";

export const useAddNewAgentSchema = z.object({
  name: z.string().min(2, "სახელი უნდა შედგებოდეს მინიმუმ ორი სიმბოლოსგან"),
  surname: z.string().min(2, "გვარი უნდა შედგებოდეს მინიმუმ ორი სიმბოლოსგან"),

  email: z
    .string()
    .min(1, "მეილის ველი არის სავალდებულო")
    .email("არასწორი ელ-ფოსტის ფორმატი")
    .superRefine((email, ctx) => {
      if (!email.endsWith("@redberry.ge")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ელ-ფოსტა უნდა მთავრდებოდეს @redberry.ge-თ",
        });
      }
    }),

  phone: z
    .string()
    .min(1, "ტელეფონის ველი არის სავალდებულო")
    .regex(/^\d+$/, "ტელეფონის ნომერი უნდა შეიცავდეს მხოლოდ ნუმერულ სიმბოლოებს")
    .superRefine((phone, ctx) => {
      if (!/^5\d{8}$/.test(phone)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ტელეფონის ნომერი უნდა იყოს ფორმატის 5XXXXXXXX",
        });
      }
    }),
  avatar: z
    .instanceof(File, "ფაილი არის აუცილებელი ველი")
    .refine((file) => !!file && file.size > 0, "ავატარი აუცილებელია")
    .refine((file) => {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      return validTypes.includes(file.type);
    }, "ავატარის გაფართოება არასწორია, ატვირთეთ .jpg .png .gif ფორმატის ფაილები")
    .refine((file) => {
      return file.size <= 1 * 1024 * 1024;
    }, "ფაილის ზომა არ უნდა აღემატებოდეს 1 მბ-ს"),
});
