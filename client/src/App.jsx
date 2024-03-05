import { Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import { Flowbite } from "flowbite-react";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Category from "./pages/categories/Category";
import CompanyDetail from "./pages/categories/CompanyDetail";
import NewsCategory from "./pages/news/NewsCategory";
import NewsDetail from "./pages/news/NewsDetail";
import Prices from "./pages/Prices";
import About from "./pages/About";
import Ethiopia from "./pages/Ethiopia";
import Contact from "./pages/Contact";

function App() {
  const jwt = localStorage.getItem("jwt");
  const user = JSON.parse(localStorage.getItem("user"));

  // console.log(jwt, user);
  return (
    <Flowbite>
      <div className="font-poppins text-black text-dark bg-dark">
        <Header />
        <div className="">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/local" element={<Category type="local" />}></Route>
            <Route path="/global" element={<Category type="global" />}></Route>
            <Route path="/company-detail" element={<CompanyDetail />}></Route>
            <Route path="/news" element={<NewsCategory />}></Route>
            <Route path="/news-detail" element={<NewsDetail />}></Route>
            <Route path="/prices" element={<Prices />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/ethiopia" element={<Ethiopia />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
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
