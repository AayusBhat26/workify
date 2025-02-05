import { z } from 'zod';
const FILE_SIZE = 5000000;
const accepted_image_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const imageSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.size <= FILE_SIZE, 'SCHEMA.IMAGE_MAX')
    .refine((file) => accepted_image_types.includes(file?.type), 'SCHEMA.IMAGE.SUPPORTED'),
});

export type ImageSchema = z.infer<typeof imageSchema>;
