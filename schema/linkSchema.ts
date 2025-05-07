import { z } from "zod";
import { accepted_image_types, max_file_size } from "./imageSchema";

export const linkSchema = z.object({
  link: z.string().url("SCHEMA.LINK"),
});

export const imageLinkSchema = z.object({
  file: z
    .any()
    .refine((file) => file, "SCHEMA.IMAGE_REQUIRED")
    .refine((file) => file?.size <= max_file_size, "SCHEMA.IMAGE.MAX")
    .refine(
      (file) => accepted_image_types.includes(file?.type),
      "SCHEMA.IMAGE.SUPPORTED"
    ),
});
export type ImageLinkSchema = z.infer<typeof imageLinkSchema>;
export type LinkSchema = z.infer<typeof linkSchema>;