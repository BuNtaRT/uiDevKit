import { FC } from "react";
import { Button, Grid2, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const TripleSubHeader: FC<PropsType> = (props) => {
  const { textButton, right, center, onClick } = props;

  return (
    <Grid2 container width="100%">
      <Grid2 size={{ lg: 3 }}>
        {onClick && (
          <Typography variant="h5">
            <Button startIcon={<ArrowBackIosIcon />} onClick={onClick}>
              {textButton ? textButton : "Назад"}
            </Button>
          </Typography>
        )}
      </Grid2>
      <Grid2 size={{ lg: 6 }}>
        <Typography variant="h5" align="center" color={"primary"}>
          {center}
        </Typography>
      </Grid2>
      <Grid2 size={{ lg: 3 }}>{right}</Grid2>
    </Grid2>
  );
};

type PropsType = {
  textButton?: string;
  onClick?: () => void;
  center?: React.ReactNode;
  right?: React.ReactNode;
};

export default TripleSubHeader;
