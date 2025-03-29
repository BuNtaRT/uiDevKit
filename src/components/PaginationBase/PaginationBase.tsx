import { FC } from "react";
import { Pagination } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import { pageState, totalCountState } from "../../atoms/atoms.ts";

const PaginationBase: FC = () => {
  const [page, setPage] = useAtom(pageState);
  const totalCount = useAtomValue(totalCountState);

  const pages = Math.ceil(totalCount / 15);

  if (pages < 1) return null;

  return (
    <Pagination
      count={pages}
      sx={{ justifyItems: "center" }}
      color="primary"
      page={page}
      onChange={(_, value) => {
        setPage(value);
      }}
    />
  );
};

export default PaginationBase;
