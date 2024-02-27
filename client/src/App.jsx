import { Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import { Flowbite } from "flowbite-react";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Category from "./pages/categories/Category";

function App() {
  const jwt = localStorage.getItem("jwt");
  const user = JSON.parse(localStorage.getItem("user"));

  // console.log(jwt, user);
  return (
    <Flowbite>
      <div
        className='font-poppins text-black text-dark bg-dark'
      >
        <Header />
        <div className="">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/local" element={<Category type='local' />}></Route>
            <Route path="/global" element={<Category type='global' />}></Route>
            <Route path="/" element={<Home />}></Route>
            {jwt && user && (
              <Route
                path="/dashboard/*"
                element={<Home role={user?.role} />}
              ></Route>
            )}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Flowbite>
  );
}

export default App;
