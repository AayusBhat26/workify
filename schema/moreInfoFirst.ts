import { z } from 'zod';

export const moreInfoFirst = z.object({
  name: z
    .string()
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
      message: 'SCHEMA.USERNAME.SPECIAL_CHARS',
    })
    .optional(),
  surname: z
    .string()
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
      message: 'SCHEMA.USERNAME.SPECIAL_CHARS',
    })
    .optional(),
});
export type moreInfoFirst = z.infer<typeof moreInfoFirst>;
