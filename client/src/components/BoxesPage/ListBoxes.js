import { Box } from "./SingleBox"
import Context from '../../context';
import { useContext } from "react";

export const ListBoxes = () => {
  const { boxes } = useContext(Context);

  return boxes.map((el) => {
    return (
      <Box 
        boxData={el}
        key={el.id}
      />
    )
  })
}