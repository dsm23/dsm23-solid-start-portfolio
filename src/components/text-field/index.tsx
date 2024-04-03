import { splitProps } from "solid-js";
import type { Component, JSX } from "solid-js";

interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextField: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ["id", "name", "label"]);

  return (
    <>
      <label class="block" for={local.id}>
        {local.label}
      </label>
      <input {...others} id={local.id} name={local.name} />
      {/* <span>{field.error()}</span> */}
    </>
  );
};

export default TextField;
