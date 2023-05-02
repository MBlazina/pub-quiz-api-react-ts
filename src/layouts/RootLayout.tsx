import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
  return (
    <div id="root-layout" className="container">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default RootLayout;
