import * as React from "react";
import {counter, getId, getPrefix, IdSourceType, source} from "./context";

type SeedGenerator = (id: any) => string;

const generateUID = (context: IdSourceType) => {
  const quartz = context || counter;
  const prefix = getPrefix(quartz);
  const id = getId(quartz);
  const uid = prefix + id;
  const gen = (item: any) => uid + quartz.uid(item);
  return {uid, gen};
};

const useUIDState = () => {
  if (process.env.NODE_ENV !== "production") {
    if (!('useContext' in React)) {
      throw new Error('Hooks API requires React 16.8+');
    }
  }

  return React.useState(generateUID(React.useContext(source)))
};

export const useUID = (): string => {
  const [{uid}] = useUIDState();
  return uid;
};

export const useUIDSeed = (): SeedGenerator => {
  const [{gen}] = useUIDState();
  return gen;
};