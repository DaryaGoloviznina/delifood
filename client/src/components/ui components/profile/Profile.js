import { useSelector } from "react-redux"
import { ClientProfile } from "../../Client/ClientProfile";
import { RestProfile } from "../../RestCRM/RestProfile";

export const Profile = () => {

  const profileData = useSelector((store) => store.auth.user);

  return profileData?.address 
    ? <RestProfile /> 
    : <ClientProfile /> 
}
