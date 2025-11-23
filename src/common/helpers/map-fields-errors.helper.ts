// @ts-nocheck
/* eslint-disable */

import { AxiosError } from 'axios';

export function MapFieldsErrors(error: AxiosError | any, target: object): object | null {
  Object.keys(error.response.data.data).forEach((key) => {
    if (Array.isArray(error.response.data.data[key])) {
      error.response.data.data[key].map(
        (e: { property?: string; properties?: string[]; message: string; errorCode: string }) => {
          if (target[e.property] !== undefined) {
            target[e.property] = {
              key: e.errorCode,
              field: e.property,
            };
          } else if (e?.properties?.length > 0 && target[e?.properties[0]] !== undefined) {
            target[e.properties[0]] = {
              key: e.errorCode,
              fields: e.properties,
            };
          }
        },
      );
    }
  });

  return target;
}
