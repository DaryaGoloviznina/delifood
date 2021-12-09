import { Outlet } from "react-router-dom";
import { ClientProfileNavigation } from "./profileComponents/ClientProfileNavigation";
import { ClientProfileData } from "./profileComponents/ClientProfileData";

export const ClientProfile = () => {
  return (
    <>
    <ClientProfileData />
    <ClientProfileNavigation />
    <Outlet />
    </>
  )
}