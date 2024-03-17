import { Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import { Flowbite } from "flowbite-react";
import Home from "./pages/Home";
import Category from "./pages/categories/Category";
import CompanyDetail from "./pages/categories/CompanyDetail";
import NewsCategory from "./pages/news/NewsCategory";
import NewsDetail from "./pages/news/NewsDetail";
import Prices from "./pages/Prices";
import About from "./pages/About";
import Ethiopia from "./pages/Ethiopia";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Company from "./pages/dashboard/Company";
import Sellers from "./pages/dashboard/Sellers";
import Visitors from "./pages/dashboard/Visitors";

function App() {
  const jwt = localStorage.getItem("jwt");
  const user = JSON.parse(localStorage.getItem("user"));

  // console.log(jwt, user);
  return (
    <Flowbite>
      <div className="font-poppins text-black overflow-hidden text-dark bg-dark">
        <Routes>
          <Route path="/" element={<Home />}>
            {/* <Route path="/" element={<Home />}></Route> */}
            <Route path="/local" element={<Category type="local" />}></Route>
            <Route path="/global" element={<Category type="global" />}></Route>
            <Route path="/company-detail" element={<CompanyDetail />}></Route>
            <Route path="/news" element={<NewsCategory />}></Route>
            <Route path="/news-detail" element={<NewsDetail />}></Route>
            <Route path="/prices" element={<Prices />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/ethiopia" element={<Ethiopia />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Route>

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/company" element={<Company />}></Route>
            <Route path="/dashboard/sellers" element={<Sellers />}></Route>
            <Route
              path="/dashboard/visitor"
              element={<Visitors />}
            ></Route>{" "}
            <Route path="*" element={<PageNotFound />}></Route>
          </Route>
          <Route path="*" element={<PageNotFound />}></Route>
          {/* <Route path="/" element={<Home />}></Route> */}
          {jwt && user && (
            <Route
              path="/dashboard/*"
              element={<Home role={user?.role} />}
            ></Route>
          )}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Flowbite>
  );
}

export default App;
