import type { Transport } from '@sveltejs/kit';

import { i18n } from '$lib/i18n';

export const reroute = i18n.reroute();

export const transport: Transport = {
  Vector: {
    decode: ([x, y]) => new Vector(x, y),
    encode: (value) => value instanceof Vector && [value.x, value.y],
  },
};
