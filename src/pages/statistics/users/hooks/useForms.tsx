import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { required } from "../../../../constant/schemesMessages.ts";
import TextFieldRHF from "../../../../components/TextFieldRHF/TextFieldRHF.tsx";
import CheckRhf from "../../../../components/CheckRHF/CheckRHF.tsx";
import TimeRhf from "../../../../components/TimeRHF/TimeRHF.tsx";
import DateRhf from "../../../../components/DateRHF/DateRHF.tsx";

export const useForms = () => {
  const editName = "Редактировать данные";
  const addName = "Добавить данные";

  const onSubmit = async (data: DataType, isEdit: boolean) => {
    console.log(data, isEdit);
  };

  const completeMessage = (isEdit: boolean) =>
    isEdit ? "Данные успешно изменены" : "Данные успешно добавлены";

  const schema = yupResolver(
    Yup.object().shape({
      name: Yup.string().required(required),
      description: Yup.string().required(required),
      isImportant: Yup.boolean().required(required),
    })
  );

  const initialValues = (data?: DataType) => {
    return {
      id: data?.id,
      name: data?.name ?? "",
      description: data?.description ?? "",
      isImportant: data?.isImportant ?? false,
    };
  };

  const fields = () => (
    <>
      <TextFieldRHF name={"name"} label={"Имя"} />
      <TextFieldRHF name={"description"} label={"Имя"} />
      <CheckRhf name={"isImportant"} label={"Важно"} />
      <TimeRhf name={"time"} label={"Время"} />
      <DateRhf name={"date"} label={"дата"} />
    </>
  );

  return {
    editName,
    addName,
    onSubmit,
    completeMessage,
    schema,
    initialValues,
    fields,
  };
};

type DataType = {
  id: string;
  name: string;
  description: string;
  isImportant: boolean;
};
