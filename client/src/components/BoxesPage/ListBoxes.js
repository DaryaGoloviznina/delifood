import { Box } from "./SingleBox"

export const ListBoxes = ({boxes}) => {

  return boxes.map((el) => {
    return (
      <Box 
        el={el}
        key={el.id}
      />
    )
  })
}