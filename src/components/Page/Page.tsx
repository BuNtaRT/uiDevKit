import { FC, ReactNode, Suspense, useEffect } from "react";
import { Container, Content, Header, LeftPanel } from "./Page.styles.ts";
import SearchField from "../SearchField/SearchField.tsx";
import { useAtom } from "jotai";
import { modalNotificationState, modalRightState, searchQueryState } from "../../atoms/atoms.ts";
import NotificationModal from "../NotificationModal/NotificationModal.tsx";
import { Box, CircularProgress } from "@mui/material";
import PanelDrawer from "../PanelDrawer/PanelDrawer.tsx";

const Page: FC<PropsType> = (props) => {
  const { leftChildren, children, needSearch, header, rightModalContent } = props;

  const [search, setSearch] = useAtom(searchQueryState);
  const [notificationModal, setNotificationModal] = useAtom(modalNotificationState);
  const [rightModal, setRightModal] = useAtom(modalRightState);

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
          <Suspense fallback={<CircularProgress />}>{children}</Suspense>
        </Content>

        <NotificationModal data={notificationModal} onClose={handleCloseNotification} />

        <PanelDrawer isOpen={!!rightModal} onClose={handleCloseRightModal} label={rightModal}>
          {rightModalContent}
        </PanelDrawer>
      </Container>
    </>
  );
};

type PropsType = {
  leftChildren?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
  needSearch?: boolean;
  rightModalContent?: React.ReactNode;
};

export default Page;
