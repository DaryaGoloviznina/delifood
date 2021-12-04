import { useSelector } from "react-redux"
import { ClientProfile } from "./ClientProfile";
import { RestProfile } from "./RestProfile";

export const Profile = () => {

  const profileData = useSelector((store) => store.auth.user ?? store.auth.business);

  return profileData?.lat 
    ? <RestProfile />
    : <ClientProfile />
}