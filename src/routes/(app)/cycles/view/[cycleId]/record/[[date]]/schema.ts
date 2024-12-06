import { z } from 'zod';

export const insertObservationSchema = z.object({
  dischargeType: z.enum(['B', 'C', 'CK', 'G', 'K', 'L', 'P', 'R', 'Y', '']),
  flowType: z.enum(['H', 'M', 'L', 'VL', '']),
  frequency: z.enum(['X1', 'X2', 'X3', 'AD', '']),
  lubricationStatus: z.enum(['0', '10DL', '10SL', '10W', '2', '2W', '4', '']),
  notes: z.string().nullable(),
});
