import Form, { FormPropsType } from "../Form/Form.tsx";
import ContainerBlock from "../ContainerBlock/ContainerBlock.tsx";
import { FieldValues } from "react-hook-form";
import { Button } from "@mui/material";

const ContainerForm = <T extends FieldValues>(props: PropsType<T>) => {
  const { methods, buttonText, title, children } = props;

  return (
    <Form methods={methods}>
      <ContainerBlock title={title} titleVariant={"center"}>
        {children}

        {buttonText && (
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {buttonText}
          </Button>
        )}
      </ContainerBlock>
    </Form>
  );
};

type PropsType<T extends FieldValues> = FormPropsType<T> & {
  title?: string;
  buttonText?: string;
};

export default ContainerForm;
