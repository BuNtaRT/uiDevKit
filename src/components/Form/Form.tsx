import { DefaultValues, FieldValues, FormProvider, Resolver, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { useSetAtom } from "jotai/index";
import { modalNotificationState } from "../../atoms/atoms.ts";
import { getErrorMessage } from "../../utils/getErrorMessage.ts";
import { useEffect } from "react";

const Form = <T extends FieldValues>(props: FormPropsType<T>) => {
  const { children, methods } = props;
  const { initialValues, schema, onSubmit, resetValues } = methods;

  const setNotification = useSetAtom(modalNotificationState);

  const formMethods = useForm<T>({
    defaultValues: initialValues,
    resolver: schema,
  });
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (resetValues) reset(resetValues as DefaultValues<T>);
  }, [resetValues]);

  const notificationError = async (values: T) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error(error);
      setNotification({ type: "error", message: getErrorMessage(error) });
    }
  };

  return (
    <FormProvider {...formMethods}>
      <Box component="form" onSubmit={handleSubmit(notificationError)} sx={{ width: "100%" }}>
        {children}
      </Box>
    </FormProvider>
  );
};

export type FormPropsType<T extends FieldValues> = {
  methods: {
    initialValues: DefaultValues<T>;
    schema: Resolver<T>;
    onSubmit: (values: T) => Promise<unknown> | void;
    resetValues?: unknown;
  };
  children: React.ReactNode;
};

export default Form;
