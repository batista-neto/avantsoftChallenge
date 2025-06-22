import { useRef } from "react";
import { useDI } from "../Context";

export function useInject<T>(name: string) {
  return useRef<T>(useDI().container.inject<T>(name)).current;
}