// import * as Yup from "yup";
import { createForm } from "@tanstack/solid-form";
import { Main } from "~/components";
import TextField from "~/components/text-field";

// const schema = Yup.object().shape({
//   firstName: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Required"),
//   lastName: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Required"),
//   email: Yup.string().email("Invalid email").required("Required"),
//   checkboxes: Yup.array().min(2, "Too Few!").max(2, "Too Many!"),
//   stooge: Yup.string().required("Required"),
//   toppings: Yup.array().required("Required"),
//   test: Yup.string().required("Required"),
// });

const SimpleForm = () => {
  const form = createForm(() => ({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: (values) => {
      // Do something with form data
      console.log(values);
    },
  }));

  return (
    <Main class="w-full px-6 py-8">
      <form.Provider>
        <form
          class="container mx-auto"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <fieldset>
            <form.Field name="firstName">
              {(field) => (
                <TextField
                  label="First Name"
                  name={field().name}
                  value={field().state.value}
                  onBlur={field().handleBlur}
                  onChange={(event) => {
                    field().handleChange(event.target.value);
                  }}
                />
              )}
            </form.Field>
          </fieldset>
          <fieldset>
            <form.Field name="lastName">
              {(field) => (
                <TextField
                  label="Last Name"
                  name={field().name}
                  value={field().state.value}
                  onBlur={field().handleBlur}
                  onChange={(event) => {
                    field().handleChange(event.target.value);
                  }}
                />
              )}
            </form.Field>
          </fieldset>

          <div class="flex gap-x-4">
            <button type="button" class="ml-auto">
              Reset
            </button>
            <button
              type="submit"
              class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
          {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
        </form>
      </form.Provider>
    </Main>
  );
};

export default SimpleForm;
