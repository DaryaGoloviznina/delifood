import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileThunk } from "../../../store/user/profile/actions";

export const ClientProfileData = ({edit}) => {
  const dispatch = useDispatch();
  const profileData = useSelector((store) => store.auth.user) ?? {};
  
  const [isEdit, SetEdit] = useState(false); // setting state for the client to edit info

  const formHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    SetEdit(false);
    dispatch(updateProfileThunk(formData))
  }
  
  return (
    <div className="mt-6 mb-6 justify-center items-center flex flex-col items-center">
      <div className="p-3 px-6 text-gray-600 rounded-xl  shadow-xl justify-center bg-gray-200 text-center items-center">
      {!isEdit 
      ? 
      <>
        {Object.entries(profileData).map(([key, value]) => {
          if (key !== 'id') return <p key={key}>{value}</p>
        })}
        <button
        className="mt-2 px-3 py-2 bg-green-600 text-white rounded-full text-m leading-none text-justify dark:text-gray-100 mt-1"
        onClick={() => SetEdit(true)}>
          Edit
        </button>
      </>
      : 
      <form onSubmit={formHandler}>
        {Object.entries(profileData).map(([key, value]) => {
          if (key !== 'id') return (
            <>
              <input 
              className="rounded-xl outline-none border-none mt-1"
              type='text' name={key} defaultValue={value} /><br/>
            </>
          )
        })}
        <button
        className="mt-2 px-3 py-2 bg-green-600 text-white rounded-full text-m leading-none text-justify dark:text-gray-100 mt-1"
        type="submit">
          Save
        </button>
      </form>
      }
      </div>
    </div>
  );
};