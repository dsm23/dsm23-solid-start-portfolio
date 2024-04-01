// @ts-nocheck

import { ObservableObserver } from "solid-js";
import { ObjectSchema } from "yup";

function subscribeOnce(observable: ObservableObserver) {
  return new Promise((resolve) => {
    observable.subscribe(resolve)(); // immediately invoke to unsubscribe
  });
}

function update(object: object, path, value) {
  object.update((o) => {
    set(o, path, value);
    return o;
  });
}

function cloneDeep(object: object) {
  return JSON.parse(JSON.stringify(object));
}

function isNullish(value) {
  return value === undefined || value === null;
}

function isEmpty(object) {
  return isNullish(object) || Object.keys(object).length <= 0;
}

function getValues(object) {
  let results = [];

  for (const [, value] of Object.entries(object)) {
    const values = typeof value === "object" ? getValues(value) : [value];
    results = [...results, ...values];
  }

  return results;
}

// TODO: refactor this so as not to rely directly on yup's API
// This should use dependency injection, with a default callback which may assume
// yup as the validation schema
function getErrorsFromSchema(
  initialValues: object,
  schema: ObjectSchema<any>,
  errors = {},
) {
  for (const key in schema) {
    switch (true) {
      case schema[key].type === "object" && !isEmpty(schema[key].fields): {
        errors[key] = getErrorsFromSchema(
          initialValues[key],
          schema[key].fields,
          { ...errors[key] },
        );
        break;
      }

      case schema[key].type === "array": {
        const values =
          initialValues && initialValues[key] ? initialValues[key] : [];
        errors[key] = values.map((value) => {
          const innerError = getErrorsFromSchema(
            value,
            schema[key].innerType.fields,
            { ...errors[key] },
          );

          return Object.keys(innerError).length > 0 ? innerError : "";
        });
        break;
      }

      default: {
        errors[key] = "";
      }
    }
  }

  return errors;
}

function deepEqual(obj1: object, obj2: object, testPrototypes = false) {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 === "function" && typeof obj2 === "function") {
    return obj1.toString() === obj2.toString();
  }

  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime();
  }

  if (
    Object.prototype.toString.call(obj1) !==
      Object.prototype.toString.call(obj2) ||
    typeof obj1 !== "object"
  ) {
    return false;
  }

  const prototypesAreEqual = testPrototypes
    ? isDeepEqual(
        Object.getPrototypeOf(obj1),
        Object.getPrototypeOf(obj2),
        true,
      )
    : true;

  const obj1Props = Object.getOwnPropertyNames(obj1);
  const obj2Props = Object.getOwnPropertyNames(obj2);

  return (
    obj1Props.length === obj2Props.length &&
    prototypesAreEqual &&
    obj1Props.every((prop) => isDeepEqual(obj1[prop], obj2[prop]))
  );
}

function assignDeep(object, value) {
  if (Array.isArray(object)) {
    return object.map((o) => assignDeep(o, value));
  }
  const copy = {};
  for (const key in object) {
    copy[key] =
      typeof object[key] === "object" && !isNullish(object[key])
        ? assignDeep(object[key], value)
        : value;
  }
  return copy;
}

function set(object, path, value) {
  if (new Object(object) !== object) return object;

  if (!Array.isArray(path)) {
    path = path.toString().match(/[^.[\]]+/g) || [];
  }

  const result = path
    .slice(0, -1)
    // TODO: replace this reduce with something more readable
    // eslint-disable-next-line unicorn/no-array-reduce
    .reduce(
      (accumulator, key, index) =>
        new Object(accumulator[key]) === accumulator[key]
          ? accumulator[key]
          : (accumulator[key] =
              Math.trunc(Math.abs(path[index + 1])) === +path[index + 1]
                ? []
                : {}),
      object,
    );

  result[path[path.length - 1]] = value;

  return object;
}

export const util = {
  assignDeep,
  cloneDeep,
  deepEqual,
  getErrorsFromSchema,
  getValues,
  isEmpty,
  isNullish,
  set,
  subscribeOnce,
  update,
};
