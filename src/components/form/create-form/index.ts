// import { derived, writable, get } from "svelte/store";
import { createEffect, createSignal, from } from "solid-js";
import { createStore } from "solid-js/store";
import { util } from "./utils";

const NO_ERROR = "";
const IS_TOUCHED = true;

function isCheckbox(element: HTMLElement) {
  return element.getAttribute && element.getAttribute("type") === "checkbox";
}

function isFileInput(element: HTMLElement) {
  return element.getAttribute && element.getAttribute("type") === "file";
}

function resolveValue(element: HTMLInputElement) {
  if (isFileInput(element)) {
    return element.files;
  } else if (isCheckbox(element)) {
    return element.checked;
  } else {
    return element.value;
  }
}

export const createForm = (config) => {
  let initialValues = config.initialValues || {};

  const validationSchema = config.validationSchema;
  const validateFunction = config.validate;
  const onSubmit = config.onSubmit;

  const getInitial = {
    values: () => util.cloneDeep(initialValues),
    errors: () =>
      validationSchema
        ? util.getErrorsFromSchema(initialValues, validationSchema.fields)
        : util.assignDeep(initialValues, NO_ERROR),
    touched: () => util.assignDeep(initialValues, !IS_TOUCHED),
  };

  const [form, setValues] = createStore(getInitial.values());
  const [errors, setErrors] = createStore(getInitial.errors());
  const [touched, setTouched] = createStore(getInitial.touched());

  const [isSubmitting, setSubmitting] = createSignal(false);
  const [isValidating, setValidating] = createSignal(false);

  const [isValid, setValid] = createSignal(false);
  const [modified, setModified] = createSignal(false);
  const [isModified, setIsModified] = createSignal(false);

  createEffect(() => {
    const noErrors = util
      .getValues(errors)
      .every((field) => field === NO_ERROR);

    setValid(noErrors);
  });

  createEffect(() => {
    const object = util.assignDeep(form, false);

    for (let key in form) {
      object[key] = !util.deepEqual(form[key], initialValues[key]);
    }

    setModified(object);
  });

  createEffect(() => {
    setIsModified(util.getValues(modified).includes(true));
  });

  function validateField(field) {
    return util
      .subscribeOnce(form)
      .then((values) => validateFieldValue(field, values[field]));
  }

  function validateFieldValue(field, value) {
    updateTouched(field, true);

    if (validationSchema) {
      setValidating(true);

      return validationSchema
        .validateAt(field, form)
        .then(() => util.update(errors, field, ""))
        .catch((error) => util.update(errors, field, error.message))
        .finally(() => {
          setValidating(false);
        });
    }

    if (validateFunction) {
      setValidating(true);
      return Promise.resolve()
        .then(() => validateFunction({ [field]: value }))
        .then((errs) =>
          util.update(errors, field, !util.isNullish(errs) ? errs[field] : "")
        )
        .finally(() => {
          setValidating(false);
        });
    }

    return Promise.resolve();
  }

  function updateValidateField(field, value) {
    updateField(field, value);
    return validateFieldValue(field, value);
  }

  function handleChange(event) {
    const element = event.target;
    const field = element.name || element.id;
    const value = resolveValue(element);

    return updateValidateField(field, value);
  }

  function handleSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    setSubmitting(true);

    return util.subscribeOnce(form).then((values) => {
      if (typeof validateFunction === "function") {
        setValidating(true);

        return Promise.resolve()
          .then(() => validateFunction(values))
          .then((error) => {
            if (util.isNullish(error) || util.getValues(error).length === 0) {
              return clearErrorsAndSubmit(values);
            } else {
              errors.set(error);
              setSubmitting(false);
            }
          })
          .finally(() => setValidating(false));
      }

      if (validationSchema) {
        setValidating(true);

        return (
          validationSchema
            .validate(values, { abortEarly: false })
            .then(() => clearErrorsAndSubmit(values))
            // eslint-disable-next-line unicorn/catch-error-name
            .catch((yupErrors) => {
              if (yupErrors && yupErrors.inner) {
                const updatedErrors = getInitial.errors();

                yupErrors.inner.map((error) =>
                  util.set(updatedErrors, error.path, error.message)
                );

                errors.set(updatedErrors);
              }
              setSubmitting(false);
            })
            .finally(() => setValidating(false))
        );
      }

      return clearErrorsAndSubmit(values);
    });
  }

  function handleReset() {
    form.set(getInitial.values());
    errors.set(getInitial.errors());
    touched.set(getInitial.touched());
  }

  function clearErrorsAndSubmit(values) {
    return Promise.resolve()
      .then(() => errors.set(getInitial.errors()))
      .then(() => onSubmit(values, form, errors))
      .finally(() => setSubmitting(false));
  }

  /**
   * Handler to imperatively update the value of a form field
   */
  function updateField(field, value) {
    util.update(form, field, value);
  }

  /**
   * Handler to imperatively update the touched value of a form field
   */
  function updateTouched(field, value) {
    util.update(touched, field, value);
  }

  /**
   * Update the initial values and reset form. Used to dynamically display new form values
   */
  function updateInitialValues(newValues) {
    initialValues = newValues;

    handleReset();
  }

  return {
    form,
    errors,
    touched,
    modified,
    isValid,
    isSubmitting,
    isValidating,
    isModified,
    handleChange,
    handleSubmit,
    handleReset,
    updateField,
    updateValidateField,
    updateTouched,
    validateField,
    updateInitialValues,
    // state: derived(
    //   [
    //     form,
    //     errors,
    //     touched,
    //     modified,
    //     isValid,
    //     isValidating,
    //     isSubmitting,
    //     isModified,
    //   ],
    //   ([
    //     $form,
    //     $errors,
    //     $touched,
    //     $modified,
    //     $isValid,
    //     $isValidating,
    //     $isSubmitting,
    //     $isModified,
    //   ]) => ({
    //     form: $form,
    //     errors: $errors,
    //     touched: $touched,
    //     modified: $modified,
    //     isValid: $isValid,
    //     isSubmitting: $isSubmitting,
    //     isValidating: $isValidating,
    //     isModified: $isModified,
    //   })
    // ),
  };
};
