import { z } from 'zod';
export const max_file_size = 400000;
export const accepted_image_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const imageSchema = z.object({
  image: z
    .any()
    .optional()
    .refine((file) => file?.size <= max_file_size, 'SCHEMA.IMAGE_MAX')
    .refine((file) => accepted_image_types.includes(file?.type), 'SCHEMA.IMAGE.SUPPORTED'),
});

export type ImageSchema = z.infer<typeof imageSchema>;
