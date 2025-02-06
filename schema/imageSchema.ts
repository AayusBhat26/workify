import { z } from 'zod';
export const FILE_SIZE = 400000;
export const accepted_image_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const imageSchema = z.object({
  image: z
    .any()
    .optional()
    .refine((file) => file?.size <= FILE_SIZE, 'SCHEMA.IMAGE_MAX')
    .refine((file) => accepted_image_types.includes(file?.type), 'SCHEMA.IMAGE.SUPPORTED'),
});

export type ImageSchema = z.infer<typeof imageSchema>;
