//-----------getting active boxes 
export const getBoxAmount = ({count, count_reserved, count_bought}) => 
  count - count_reserved - count_bought;