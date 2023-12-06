import { Component, JSX, splitProps } from "solid-js";

interface Props
  extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "value"> {
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
