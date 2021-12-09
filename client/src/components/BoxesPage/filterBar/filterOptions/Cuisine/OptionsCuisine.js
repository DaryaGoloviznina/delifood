export const CuisineOption = ({id, cuisine, selected}) => {
  
  return (
    <option 
      id={id}
      selected={
        selected && selected  
      }
    >{cuisine}</option>
  )
}
