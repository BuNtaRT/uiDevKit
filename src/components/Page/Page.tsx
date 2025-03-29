import { ReactNode, Suspense, useEffect } from "react";
import { Container, Content, Header, LeftPanel, PaginationContainer } from "./Page.styles.ts";
import SearchField from "../SearchField/SearchField.tsx";
import { useAtom, useSetAtom } from "jotai";
import {
  modalNotificationState,
  modalRightState,
  searchQueryState,
  totalCountState,
} from "../../atoms/atoms.ts";
import NotificationModal from "../NotificationModal/NotificationModal.tsx";
import { Box, CircularProgress, LinearProgress } from "@mui/material";
import PanelDrawer from "../PanelDrawer/PanelDrawer.tsx";
import PaginationBase from "../PaginationBase/PaginationBase.tsx";
import PageForm, { FormPagePropsType } from "../PageForm/PageForm.tsx";
import { FieldValues } from "react-hook-form";

const Page = <T extends FieldValues>(props: PropsType<T>) => {
  const { leftChildren, children, needSearch, header, rightModalContent } = props;
  const { isLoading, totalCount, formMethods } = props;

  const [search, setSearch] = useAtom(searchQueryState);
  const [notificationModal, setNotificationModal] = useAtom(modalNotificationState);
  const [rightModal, setRightModal] = useAtom(modalRightState);
  const setTotalCount = useSetAtom(totalCountState);

  useEffect(() => {
    if (totalCount !== undefined) setTotalCount(totalCount);

    return () => {
      setTotalCount(0);
    };
  }, [totalCount]);

  useEffect(() => {
    return () => {
      setSearch("");
      setNotificationModal(undefined);
    };
  }, []);

  const handleCloseNotification = () => setNotificationModal(undefined);
  const handleCloseRightModal = () => setRightModal("");

  return (
    <>
      {header && <Header>{header}</Header>}
      <Container>
        {leftChildren && <LeftPanel>{leftChildren}</LeftPanel>}

        <Content sx={{ pt: header ? 0 : 4 }}>
          {needSearch && (
            <Box sx={{ mb: 2 }}>
              <SearchField value={search} onChange={setSearch} />
            </Box>
          )}
          <Suspense fallback={<CircularProgress />}>
            {isLoading ? <LinearProgress /> : children}
          </Suspense>
        </Content>

        <NotificationModal data={notificationModal} onClose={handleCloseNotification} />

        {formMethods ? <PageForm methods={formMethods} /> : undefined}
        <PanelDrawer isOpen={!!rightModal} onClose={handleCloseRightModal} label={rightModal}>
          {rightModalContent}
        </PanelDrawer>

        {!!totalCount && totalCount > 15 && (
          <PaginationContainer>
            <PaginationBase />
          </PaginationContainer>
        )}
      </Container>
    </>
  );
};

type PropsType<T extends FieldValues> = {
  leftChildren?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
  needSearch?: boolean;
  rightModalContent?: React.ReactNode;
  isLoading?: boolean;
  totalCount?: number;

  formMethods?: FormPagePropsType<T>["methods"];
};

export default Page;
