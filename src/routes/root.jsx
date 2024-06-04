import { Outlet } from "react-router-dom";
import Top from "../components/home/top";
import RouterBottomNavigation from "../components/menu/menu";

export default function Root() {
  return (
    <>
      <Top />
      <Outlet />
      <RouterBottomNavigation />
    </>
  );
}
