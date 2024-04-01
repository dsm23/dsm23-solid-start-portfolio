import { Component, JSX, children } from "solid-js";
import { createStore } from "solid-js/store";

interface Props {
  initialValues: object;
  onSubmit: (values: object) => void;
  children: ((T: any) => JSX.Element) | JSX.Element;
}

type Store = {
  values: object;
  touched: Record<string, boolean>;
  errors: Record<string, string>;
};

const Form: Component<Props> = (props) => {
  const [state, setState] = createStore<Store>({
    values: props.initialValues,
    touched: {},
    errors: {},
  });

  const handleChange: JSX.EventHandler<HTMLInputElement, InputEvent> = (
    event,
  ) => {
    const target = event.currentTarget;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setState("values", (prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur: JSX.EventHandler<HTMLInputElement, InputEvent> = (
    event,
  ) => {
    const target = event.currentTarget;
    const name = target.name;

    setState("touched", (prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (e) => {
    e.preventDefault();
    // set all fields as touched
    // set isSubmitting
    // set isValidating
    props.onSubmit(state.values);
  };

  const c = children(() =>
    typeof props.children !== "function"
      ? props.children
      : props.children({
          ...state,
          handleChange,
          handleBlur,
          handleSubmit,
        }),
  );

  return <>{c()}</>;
};

export default Form;
