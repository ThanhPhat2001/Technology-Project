import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <section className="main_content">
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default DefaultLayout;
