import { FC } from "react";

const Logo: FC<PropsType> = (props) => {

  console.log(props)
  return (
    <p>1</p>
  );
};

type PropsType = {
  color?: string
  size?: number
}
export default Logo;
