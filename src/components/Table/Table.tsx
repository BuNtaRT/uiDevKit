import { FC, ReactNode } from "react";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table as MuiTable,
} from "@mui/material";
import { gridToPercentages } from "../../utils/gridToPercentages.ts";

const Table: FC<PropsType> = (props) => {
  const { methods } = props;
  const { header, data, size } = methods;

  const tableSizes = size ? gridToPercentages(size) : undefined;

  return (
    <TableContainer component={Paper}>
      <MuiTable>
        {/* Заголовок таблицы */}
        <TableHead>
          <TableRow>
            {Object.values(header).map((headerCell, i) => (
              <TableCell sx={tableSizes ? { width: tableSizes[i] } : undefined} key={i}>
                {headerCell}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Тело таблицы */}
        <TableBody>
          {data.map((objectContent, i) => (
            <TableRow key={i}>
              {Object.values(objectContent).map((cellContent, j) => (
                <TableCell key={j}>{cellContent}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

type PropsType = {
  methods: {
    header: { [key: string]: ReactNode };
    data: { [key: string]: ReactNode }[];
    size?: string;
  };
};

export default Table;
