import * as React from 'react';
import {generateUID} from "./uid";

export type IdSourceType = {
  value: number,
  prefix: string,
  uid: (item: any, index?: number) => string,
}

export const createSource = (prefix = 'ruid-'): IdSourceType => ({
  value: 1,
  prefix: prefix,
  uid: generateUID()
});

export interface UIDProps {
  name?: (n: string | number) => string,
  idSource?: IdSourceType,
  children: (id: string, uid: (item: any, index?: number) => string) => React.ReactNode
}

export const counter = createSource();

export const source = React.createContext(createSource());

export const getId = (source: IdSourceType) => source.value++;
export const getPrefix = (source?: IdSourceType) => source ? source.prefix : 'ruid-';