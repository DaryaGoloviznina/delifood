export default (boxes) => {
  const formatedBoxArr = [];

  boxes.forEach((box) => {
    const index = formatedBoxArr.findIndex((formatedBox) => 
      formatedBox.store_name === box.store_name
      || formatedBox[0]?.store_name === box.store_name
    );

    if (index !== -1) formatedBoxArr[index] = 
      formatedBoxArr[index].length 
        ? [...formatedBoxArr[index], box]
        : [formatedBoxArr[index], box];
    else formatedBoxArr.push(box);
  })

  return formatedBoxArr;
}