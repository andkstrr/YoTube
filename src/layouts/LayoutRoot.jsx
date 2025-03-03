import { Outlet } from "react-router";
import Header from "../components/Header";

export default function Layout() {
  return (
    <div className="min-h-screen px-7 pt-2.5 space-y-8 w-full scroll-y">
      <Header />
      <Outlet />
    </div>
  );
}
