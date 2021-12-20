import { useContext } from "react";
import Context from '../../../../context'

export const OptionsTime = () => {
  const { time: selected } = useContext(Context).pickedOptions;

  const options = [
    {
      value: "anyTime", 
      content: "Pick Up Until",
    },
    {
      value: "09:00", 
      content: "09:00",
    },
    {
      value: "09:30", 
      content: "09:30",
    },
    {
      value: "10:00", 
      content: "10:00",
    },
    {
      value: "10:30", 
      content: "10:30",
    },
    {
      value: "11:00", 
      content: "11:00",
    },
    {
      value: "11:30", 
      content: "11:30",
    },
    {
      value: "12:00", 
      content: "12:00",
    },
    {
      value: "12:30", 
      content: "12:30",
    },
    {
      value: "13:00", 
      content: "13:00",
    },
    {
      value: "13:30", 
      content: "13:30",
    },
    {
      value: "14:00", 
      content: "14:00",
    },
    {
      value: "14:30", 
      content: "14:30",
    },
    {
      value: "15:00", 
      content: "15:00",
    },
    {
      value: "15:30", 
      content: "15:30",
    },
    {
      value: "16:00", 
      content: "16:00",
    },
    {
      value: "16:30", 
      content: "16:30",
    },
    {
      value: "17:00", 
      content: "17:00",
    },
    {
      value: "17:30", 
      content: "17:30",
    },
    {
      value: "18:00", 
      content: "18:00",
    },
    {
      value: "18:30", 
      content: "18:30",
    },
    {
      value: "19:00", 
      content: "19:00",
    },
    {
      value: "19:30", 
      content: "19:30",
    },
    {
      value: "20:00", 
      content: "20:00",
    },
    {
      value: "20:30", 
      content: "20:30",
    },
    {
      value: "21:00", 
      content: "21:00",
    },
    {
      value: "21:30", 
      content: "21:30",
    },
    {
      value: "22:00", 
      content: "22:00",
    },
    {
      value: "22:30", 
      content: "22:30",
    },
    {
      value: "23:00", 
      content: "23:00",
    },
    {
      value: "23:30", 
      content: "23:30",
    },
  ];

  return options.map((el) => 
      <option 
        value={el.value}
        selected={selected === el.value && 'selected'}
      >{el.content}</option>
    )
}