import { DefaultValues, FieldValues, FormProvider, Resolver, useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { useSetAtom } from "jotai/index";
import { modalNotificationState } from "../../atoms/atoms.ts";
import { getErrorMessage } from "../../utils/getErrorMessage.ts";
import { useEffect } from "react";
import ButtonContainer from "../ButtonContainer/ButtonContainer.tsx";

const Form = <T extends FieldValues>(props: FormPropsType<T>) => {
  const { children, methods, onClose } = props;
  const { initialValues, schema, onSubmit, resetValues, completeMessage } = methods;

  const setNotification = useSetAtom(modalNotificationState);

  const formMethods = useForm<T>({
    defaultValues: initialValues,
    resolver: schema as Resolver<T>,
  });
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (resetValues) reset(resetValues as DefaultValues<T>);
  }, [resetValues]);

  const notificationError = async (values: T) => {
    try {
      await onSubmit(values);

      if (completeMessage) setNotification({ type: "success", message: completeMessage });
    } catch (error) {
      setNotification({ type: "error", message: getErrorMessage(error) });
    }
  };

  return (
    <FormProvider {...formMethods}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 2,
          height: "100%",
        }}
      >
        <Box component="form" onSubmit={handleSubmit(notificationError)} sx={{ width: "100%" }}>
          {children}
        </Box>

        {onClose && (
          <ButtonContainer
            onSubmit={handleSubmit(notificationError)}
            fullWidth
            onCancel={onClose}
          />
        )}
      </Box>
    </FormProvider>
  );
};

export type FormPropsType<T extends FieldValues> = {
  methods: {
    initialValues: DefaultValues<T>;
    schema: Resolver<any>;
    onSubmit: (values: T) => Promise<unknown> | void;
    resetValues?: unknown;
    completeMessage?: string;
  };
  onClose?: () => void;
  children: React.ReactNode;
};

export default Form;
