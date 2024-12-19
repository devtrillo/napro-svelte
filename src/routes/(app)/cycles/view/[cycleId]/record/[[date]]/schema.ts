import { z } from 'zod';

export const insertObservationSchema = z.object({
  dischargeType: z.string(),
  flowType: z.string(),
  frequency: z.string(),
  lubricationStatus: z.string(),
  notes: z.string().nullable(),
});
