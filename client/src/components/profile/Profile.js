import { useSelector } from "react-redux"
import { ClientProfile } from "./ClientProfile";
import { RestProfile } from "./RestProfile";

export const Profile = () => {

  const profileData = useSelector((store) => store.auth.user ?? store.auth.business);
  console.log(profileData);
  return profileData?.address 
    ? <RestProfile />
    : <ClientProfile />
}