import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { updateProfileThunk } from "../../store/auth/actions";
import { ActionButton } from "../Buttons/ActionButton";

export const RestProfile = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((store) => store.auth.business) ?? {};
  const [isEdit, SetEdit] = useState(false);

  const formHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    SetEdit(false);
    dispatch(updateProfileThunk(formData))
  }

  return (
    !isEdit 
    ? 
    <>
      {Object.entries(profileData).map(([key, value]) => {
        if (key !== 'id') return <p key={key}>{value}</p>
      })}
      <ActionButton content={'Edit'} func={() => SetEdit(true)}/>
    </>
    : 
    <form onSubmit={formHandler}>
      {Object.entries(profileData).map(([key, value]) => {
        if (key !== 'id') return (
          <>
            <input type='text' name={key} defaultValue={value} /><br/>
          </>
        )
      })}
      <ActionButton content={'Save'} type='submit'/>
    </form>
  )
}