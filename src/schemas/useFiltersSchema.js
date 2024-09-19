import { z } from "zod";

export const useFiltersSchema = z.object({
  region: z.string(),
});
