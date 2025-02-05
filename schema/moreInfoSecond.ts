import { z } from 'zod';

export const moreInfoSecond = z.object({
  useCase: z.enum(['WORK', 'STUDY', 'PERSONAL'], {
    required_error: 'You need to select a type.',
  }),
});

export type moreInfoSecond = z.infer<typeof moreInfoSecond>;
