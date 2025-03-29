import { FC } from "react";
import Page from "../../../components/Page/Page.tsx";
import { useTable } from "./hooks/useTable.tsx";
import Table from "../../../components/Table/Table.tsx";
import { useForms } from "./hooks/useForms.tsx";
import ButtonContainer from "../../../components/ButtonContainer/ButtonContainer.tsx";
import { Divider } from "@mui/material";

const StatisticsUsersPage: FC = () => {
  const tableMethods = useTable();
  const formMethods = useForms();

  const { setFormState } = tableMethods;

  return (
    <Page formMethods={formMethods}>
      <ButtonContainer onAdd={() => setFormState(true)} />
      <Divider sx={{ my: 2 }} />
      <Table methods={tableMethods} />
    </Page>
  );
};

export default StatisticsUsersPage;
