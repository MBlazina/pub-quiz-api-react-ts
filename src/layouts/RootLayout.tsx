import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
  return (
    <div id="root-layout" className="container">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer style={{ textAlign: "center" }}>Created with React, react-router-dom and json-server.</footer>
    </div>
  );
};

export default RootLayout;
