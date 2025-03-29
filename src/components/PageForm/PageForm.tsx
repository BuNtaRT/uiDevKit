import { DefaultValues, FieldValues, Resolver } from "react-hook-form";
import PanelDrawer from "../PanelDrawer/PanelDrawer.tsx";
import { useAtom } from "jotai";
import { formState } from "../../atoms/atoms.ts";
import Form from "../Form/Form.tsx";
import { ReactNode } from "react";

const PageForm = <T extends FieldValues>(props: FormPagePropsType<T>) => {
  const { methods } = props;
  const {
    initialValues: initialValuesProp,
    schema,
    onSubmit: onSubmitProp,
    completeMessage: completeMessageProp,
    fields,
  } = methods;
  const { addName, editName } = methods;

  const [formContent, setFormContent] = useAtom(formState);

  console.log(formContent);
  const isAdd = formContent === true;

  const formTitle = isAdd ? addName : editName;

  const handleCloseForm = () => {
    setFormContent(false);
  };

  const onSubmit = async (values: T) => {
    await onSubmitProp(values, !isAdd);
    handleCloseForm();
  };

  const initialValues = initialValuesProp(formContent === true ? undefined : (formContent as T));

  const completeMessage = completeMessageProp ? completeMessageProp(!isAdd) : undefined;

  const formMethods = {
    onSubmit,
    schema,
    initialValues,
    completeMessage,
  };

  return (
    <PanelDrawer isOpen={!!formContent} onClose={handleCloseForm} width={550} label={formTitle}>
      <Form methods={formMethods} onClose={handleCloseForm}>
        {fields(!isAdd)}
      </Form>
    </PanelDrawer>
  );
};

export type FormPagePropsType<T extends FieldValues> = {
  methods: {
    editName: string;
    addName: string;
    initialValues: (data?: T) => DefaultValues<T>;
    schema: Resolver<any>;
    onSubmit: (values: T, isEdit: boolean) => Promise<unknown> | void;
    completeMessage?: (isEdit: boolean) => string;
    fields: (isEdit: boolean) => ReactNode;
  };
};

export default PageForm;
