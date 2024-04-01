// import { cloneElement, isValidElement, ReactNode } from 'react';
import { JSX } from "solid-js";

export function appendKeyToValidElement(
  element: JSX.Element,
  key: number,
): JSX.Element {
  // if (isValidElement(element) && element.key === null) {
  //   return cloneElement(element, { key });
  // }
  return element;
}
