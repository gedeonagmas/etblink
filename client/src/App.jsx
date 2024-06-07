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
import SalesCompany from "./pages/dashboard/sales/SalesCompany";
import Referrals from "./pages/dashboard/sales/Referrals";
import Earns from "./pages/dashboard/Earns";
import Ratings from "./pages/dashboard/sales/Ratings";
import Boosting from "./pages/dashboard/company/Boosting";
import AddBoost from "./pages/dashboard/admin/AddBoost";
import UpdateBoost from "./pages/dashboard/admin/UpdateBoost";
// import AddSubscriptions from "./pages/dashboard/admin/AddSubscriptions";
import Billing from "./pages/dashboard/company/Billing";
import Success from "./pages/Success";
import Subscription from "./pages/dashboard/company/Subscription";
import Sales from "./pages/dashboard/Sales";
import Message from "./pages/Message";
import UpdateBlog from "./pages/dashboard/admin/UpdateBlog";
import AddBlog from "./pages/dashboard/admin/AddBlog";
import UpdatePrices from "./pages/dashboard/admin/UpdatePrices";
import AddPrices from "./pages/dashboard/admin/AddPrices";
import Users from "./pages/dashboard/admin/Users";
import UsersProfile from "./pages/dashboard/UsersProfile";
import SalesDetail from "./pages/SalesDetail";
import BlogsCategory from "./pages/blogs/BlogsCategory";
import BlogsDetail from "./pages/blogs/BlogsDetail";
import AddCategory from "./pages/dashboard/admin/AddCategory";
import UpdateCategory from "./pages/dashboard/admin/UpdateCategory";
import Bills from "./pages/dashboard/admin/Bills";
import Notifications from "./pages/dashboard/Notifications";
import Sponsors from "./pages/dashboard/admin/Sponsors";
import Banners from "./pages/dashboard/admin/Banners";
import AddJob from "./pages/dashboard/admin/AddJob";
import UpdateJob from "./pages/dashboard/admin/UpdateJob";
import JobCategory from "./pages/jobs/JobCategory";
import JobDetail from "./pages/jobs/JobDetail";

export const userContext = createContext();

function App() {
  const { data: user } = useReadQuery({
    url: "/user/readProfileInfo",
    tag: ["users"],
  });

  const { data: admin } = useReadQuery({
    url: "/user/users?role=admin",
    tag: ["users"],
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("etblink_user", JSON.stringify(user));
    }
  }, []);

  // useEffect(() => {});
  // const user = { data: { email: "gedi@gmail.com" } };
  console.log(admin, "from app js");
  return (
    <Flowbite>
      <userContext.Provider value={{ user: user?.data }}>
        <div className="font-poppins text-black overflow-hidden text-dark bg-dark">
          <Routes>
            <Route path="/" element={<HomeTemplate />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              {admin?.total===0 && (
                <Route
                  path="/signup/admin"
                  element={<Signup type="admin" />}
                ></Route>
              )}
              <Route path="/forget" element={<Forget />}></Route>
              <Route path="/reset" element={<Reset />}></Route>
              <Route path="/local" element={<Category type="local" />}></Route>
              <Route
                path="/global"
                element={<Category type="global" />}
              ></Route>
              <Route path="/companies" element={<Category type="" />}></Route>
              <Route path="/company" element={<CompanyDetail />}></Route>
              <Route path="/news" element={<NewsCategory />}></Route>
              <Route path="/news-detail" element={<NewsDetail />}></Route>
              <Route path="/event" element={<BlogsCategory />}></Route>
              <Route path="/event-detail" element={<BlogsDetail />}></Route>
              <Route path="/job" element={<JobCategory />}></Route>
              <Route path="/job-detail" element={<JobDetail />}></Route>
              <Route path="/prices" element={<Prices />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/ethiopia" element={<Ethiopia />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route
                path="/sales"
                element={<SalesDetail type="global" />}
              ></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Route>

            {/* ############################## DASHBOARD ################################# */}
            <Route path="/dashboard" element={<Dashboard />}>
              {/* ############################## COMPANY ################################# */}
              <Route path="/dashboard/company" element={<Company />}></Route>
              <Route
                path="/dashboard/company/share"
                element={<Referrals type="company" />}
              ></Route>
              <Route
                path="/dashboard/company/boosting"
                element={<Boosting />}
              ></Route>
              <Route
                path="/dashboard/company/billing"
                element={<Billing />}
              ></Route>
              <Route
                path="/dashboard/company/subscription"
                element={<Subscription type="default" />}
              ></Route>
              <Route
                path="/dashboard/company/saves"
                element={<Saves type="company" />}
              ></Route>
              <Route
                path="/dashboard/company/sales"
                element={<SalesDetail type="company" />}
              ></Route>
              <Route
                path="/dashboard/company/views"
                element={<Views type="company" />}
              ></Route>
              <Route
                path="/dashboard/company/profile"
                element={<Profile />}
              ></Route>
              <Route
                path="/dashboard/company/change-password"
                element={<ChangePassword />}
              ></Route>
              {/* ################################################################### */}
              {/* ############################## SALES ############################## */}
              <Route path="/dashboard/sales" element={<Sellers />}></Route>
              <Route
                path="/dashboard/sales/profile"
                element={<UsersProfile />}
              ></Route>
              <Route
                path="/dashboard/sales/company"
                element={<SalesCompany />}
              ></Route>
              <Route
                path="/dashboard/sales/profile"
                element={<Profile />}
              ></Route>
              <Route
                path="/dashboard/sales/referrals"
                element={<Referrals type="sales" />}
              ></Route>
              <Route path="/dashboard/sales/earns" element={<Earns />}></Route>
              <Route
                path="/dashboard/sales/ratings"
                element={<Ratings />}
              ></Route>
              {/* ################################################################### */}
              {/* ############################## ADMIN ############################## */}
              <Route path="/dashboard/admin/news" element={<AddNews />}></Route>
              <Route
                path="/dashboard/admin/news/detail"
                element={<NewsDetailAdmin />}
              ></Route>
              <Route
                path="/dashboard/admin/profile"
                element={<UsersProfile />}
              ></Route>
              <Route
                path="/dashboard/admin/youtube"
                element={<AddYoutube />}
              ></Route>
              <Route
                path="/dashboard/admin/prices"
                element={<AddPrices />}
              ></Route>
              <Route
                path="/dashboard/admin/prices/detail"
                element={<UpdatePrices />}
              ></Route>
              <Route
                path="/dashboard/admin/youtube/detail"
                element={<UpdateYoutube />}
              ></Route>
              <Route
                path="/dashboard/admin/boost"
                element={<AddBoost />}
              ></Route>
              <Route
                path="/dashboard/admin/boost/detail"
                element={<UpdateBoost />}
              ></Route>
              <Route
                path="/dashboard/admin/category"
                element={<AddCategory />}
              ></Route>{" "}
              <Route
                path="/dashboard/admin/category/detail"
                element={<UpdateCategory />}
              ></Route>
              <Route path="/dashboard/admin/blog" element={<AddBlog />}></Route>
              <Route
                path="/dashboard/admin/blog/detail"
                element={<UpdateBlog />}
              ></Route>
              <Route path="/dashboard/admin/job" element={<AddJob />}></Route>
              <Route
                path="/dashboard/admin/job/detail"
                element={<UpdateJob />}
              ></Route>
              <Route path="/dashboard/admin/users" element={<Users />}></Route>
              <Route
                path="/dashboard/admin/users/manage"
                element={<UsersProfile />}
              ></Route>
              <Route
                path="/dashboard/admin/companies/manage"
                element={<Profile />}
              ></Route>
              <Route
                path="/dashboard/admin/sponsors"
                element={<Sponsors />}
              ></Route>
              <Route
                path="/dashboard/admin/banners"
                element={<Banners />}
              ></Route>
              <Route
                path="/dashboard/admin/approval"
                element={<Bills />}
              ></Route>
              <Route
                path="/dashboard/admin/subscription/custom"
                element={<Subscription type="custom" />}
              ></Route>
              {/* ################################################################### */}
              {/* ############################## VISITOR ############################## */}
              <Route path="/dashboard/visitor" element={<Visitors />}></Route>
              <Route
                path="/dashboard/visitor/profile"
                element={<UsersProfile />}
              ></Route>
              {/* ################################################################### */}
              {/* ############################## NEWS-ADMIN ############################## */}
              <Route
                path="/dashboard/news-admin"
                element={<Visitors />}
              ></Route>
              <Route
                path="/dashboard/news-admin/profile"
                element={<UsersProfile />}
              ></Route>
              <Route
                path="/dashboard/news-admin/news"
                element={<AddNews />}
              ></Route>
              <Route
                path="/dashboard/news-admin/news/detail"
                element={<NewsDetailAdmin />}
              ></Route>
              {/* ################################################################### */}
              {/* ############################## YOUTUBE-ADMIN ############################## */}
              <Route
                path="/dashboard/youtube-admin"
                element={<Visitors />}
              ></Route>
              <Route
                path="/dashboard/youtube-admin/profile"
                element={<UsersProfile />}
              ></Route>
              <Route
                path="/dashboard/youtube-admin/youtube"
                element={<AddYouTube />}
              ></Route>
              <Route
                path="/dashboard/youtube-admin/youtube/detail"
                element={<UpdateYoutube />}
              ></Route>
              {/* ################################################################### */}
              {/* ############################## BLOG-ADMIN ############################## */}
              <Route
                path="/dashboard/blog-admin"
                element={<Visitors />}
              ></Route>{" "}
              <Route
                path="/dashboard/blog-admin/profile"
                element={<UsersProfile />}
              ></Route>
              <Route
                path="/dashboard/blog-admin/blog"
                element={<AddBlog />}
              ></Route>
              <Route
                path="/dashboard/blog-admin/blog/detail"
                element={<UpdateBlog />}
              ></Route>
              {/* ################################################################### */}
              {/* ############################## JOB-ADMIN ############################## */}
              <Route path="/dashboard/job-admin" element={<Visitors />}></Route>{" "}
              <Route
                path="/dashboard/job-admin/profile"
                element={<UsersProfile />}
              ></Route>
              <Route
                path="/dashboard/job-admin/job"
                element={<AddJob />}
              ></Route>
              <Route
                path="/dashboard/job-admin/job/detail"
                element={<UpdateJob />}
              ></Route>
              {/* ################################################################### */}
              {/* ############################## COMMON ############################## */}
              <Route path="/dashboard/success" element={<Success />}></Route>
              <Route path="/dashboard/admin" element={<Admin />}></Route>
              <Route path="/dashboard/saves" element={<Saves />}></Route>
              <Route
                path="/dashboard/notifications"
                element={<Notifications />}
              ></Route>
              <Route path="/dashboard/views" element={<Views />}></Route>
              <Route path="/dashboard/upgrade" element={<Upgrade />}></Route>
              <Route path="/dashboard/message" element={<Message />}></Route>
              {/* ################################################################### */}
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
