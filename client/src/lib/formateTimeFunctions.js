// функция переводит время из строки-объекта из бд в строку формата 00:00
function convertObjTimetoStrTime(obj){
  let hours = new Date(obj).getHours();
  if (hours < 10) hours = '0' + hours;
  let minutes = new Date(obj).getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  return `${hours}:${minutes}`
}

function createStrDateFromDB(str){
  let month = new Date(str).getMonth();
  let day = new Date(str).getDate();
  return `${day < 10 ? '0'+day : day}.${month+1 < 10 ? '0'+ (month+1) : month+1}.${new Date(str).getFullYear()}`;
}
//фунция добавляет в объект бокса дополнительные данные форматированной даты и времени
function addDateAndTimeToBox(box){
  box.timeFrom = convertObjTimetoStrTime(box.start_date);
  box.timeTo = convertObjTimetoStrTime(box.end_date);
  box.date = createStrDateFromDB(box.start_date);
  return box;
}

function formateDate (str, date = 'now') { // функция которая принимает строку '00:00' и делает объект времени с сегодняшним числом и указанным временем
  let [hours, minites] = str.split(':');
  if (hours[0]=== '0') hours = hours[1];
  if (minites[0]=== '0') minites = minites[1];
  if (date === 'now') {
    return new Date(new Date().setHours(Number(hours), Number(minites)))
  } else {
    let time =  new Date(new Date(date).setHours(Number(hours), Number(minites)))
    return  time  // уточнить какая дата
  }
}

export {
  convertObjTimetoStrTime, 
  addDateAndTimeToBox, 
  formateDate, 
  createStrDateFromDB }
