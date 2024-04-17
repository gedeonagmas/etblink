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
import HomeTemplate from "./pages/HomeTemplate";
import Signup from "./pages/Signup";
import { createContext, useEffect, useState } from "react";
// import Cookies from "js-cookie";
import { useReadQuery } from "./features/api/apiSlice";
import Profile from "./pages/dashboard/Profile";
import Forget from "./pages/Forget";
import Reset from "./pages/Reset";
import ChangePassword from "./pages/dashboard/ChangePassword";
import Admin from "./pages/dashboard/Admin";
import AddNews from "./pages/dashboard/news/AddNews";
import AddYouTube from "./pages/dashboard/youtube/AddYoutube";
import NewsDetailAdmin from "./pages/dashboard/news/UpdateNews";
import AddYoutube from "./pages/dashboard/youtube/AddYoutube";
import UpdateYoutube from "./pages/dashboard/youtube/UpdateYoutube";
import Saves from "./pages/dashboard/Saves";
import Views from "./pages/dashboard/Views";
import Upgrade from "./pages/dashboard/Upgrade";

export const userContext = createContext();

function App() {
  const { data: user } = useReadQuery({
    url: "/user/readProfileInfo",
    tag: ["users"],
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("etblink_user", JSON.stringify(user));
    }
  }, []);
  // useEffect(() => {});
  // const user = { data: { email: "gedi@gmail.com" } };
  // console.log(user?.data, "from app js");
  return (
    <Flowbite>
      <userContext.Provider value={{ user: user?.data }}>
        <div className="font-poppins text-black overflow-hidden text-dark bg-dark">
          <Routes>
            <Route path="/" element={<HomeTemplate />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/forget" element={<Forget />}></Route>
              <Route path="/reset" element={<Reset />}></Route>
              <Route path="/local" element={<Category type="local" />}></Route>
              <Route
                path="/global"
                element={<Category type="global" />}
              ></Route>
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
              <Route path="/dashboard/sales" element={<Sellers />}></Route>
              <Route path="/dashboard/visitor" element={<Visitors />}></Route>
              <Route path="/dashboard/admin" element={<Admin />}></Route>
              <Route path="/dashboard/saves" element={<Saves />}></Route>
              <Route
                path="/dashboard/company/saves"
                element={<Saves type="company" />}
              ></Route>
              <Route path="/dashboard/views" element={<Views />}></Route>
              <Route
                path="/dashboard/company/views"
                element={<Views type="company" />}
              ></Route>
              <Route path="/dashboard/upgrade" element={<Upgrade />}></Route>
              <Route path="/dashboard/admin/news" element={<AddNews />}></Route>
              <Route
                path="/dashboard/admin/news/detail"
                element={<NewsDetailAdmin />}
              ></Route>
              <Route
                path="/dashboard/admin/youtube"
                element={<AddYoutube />}
              ></Route>
              <Route
                path="/dashboard/admin/youtube/detail"
                element={<UpdateYoutube />}
              ></Route>
              <Route
                path="/dashboard/company/profile"
                element={<Profile />}
              ></Route>
              <Route
                path="/dashboard/sales/profile"
                element={<Profile />}
              ></Route>
              <Route
                path="/dashboard/visitor/profile"
                element={<Profile />}
              ></Route>
              <Route
                path="/dashboard/company/change-password"
                element={<ChangePassword />}
              ></Route>

              <Route path="*" element={<PageNotFound />}></Route>
            </Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </div>
      </userContext.Provider>
    </Flowbite>
  );
}

export default App;
