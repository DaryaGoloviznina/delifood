import { useSelector } from "react-redux"
import { Outlet, Link } from "react-router-dom";
import { ClientProfile } from "../../Client/ClientProfile";
import { RestProfile } from "../../RestCRM/RestProfile";

export const Profile = () => {

  const profileData = useSelector((store) => store.auth.user);
  console.log(profileData);
  return profileData?.address 
    ? <RestProfile /> 
    : 
    <> 
      <ClientProfile /> 
    </>
}
