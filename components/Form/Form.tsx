import { Form as FormikForm } from "formik";
import { PropsWithChildren } from "react";

export const Form = ({ children }: PropsWithChildren) => {
  return (
    <FormikForm
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </FormikForm>
  );
};
