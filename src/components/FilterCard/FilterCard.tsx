import Form, { FormPropsType } from "../Form/Form.tsx";
import { FieldValues } from "react-hook-form";
import { Button, Typography } from "@mui/material";
import { Line } from "../MicroComponents.ts";
import { Filters, FormContainer } from "./FilterCard.styles.ts";

const FilterCard = <T extends FieldValues>(props: PropsType<T>) => {
  const { children, methods, label = "Фильтры" } = props;

  return (
    <FormContainer>
      <Form methods={methods}>
        <Filters>
          <Typography variant="h5" align="center" sx={{ pt: 1 }}>
            {label}
          </Typography>
          <Line margin={12} />
          {children}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            применить
          </Button>
        </Filters>
      </Form>
    </FormContainer>
  );
};

type PropsType<T extends FieldValues> = FormPropsType<T> & { label?: string };

export default FilterCard;
