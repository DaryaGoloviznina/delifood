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
      <div>
        <Link to='/profile/all'><button>ВСЕ</button></Link>  
        <Link to='/profile/active'><button>Активные</button></Link>  
        <Link to='/profile/finished'><button>Неактивные</button></Link>  
        <Outlet />
      </div>
    </>
}
