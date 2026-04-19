import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/home";
import Profile from "../pages/Profile/Profile";
import CreatePost from "../pages/CreatePost/CreatePost";
import NotFound from "../pages/NotFound/Notfound";
import SocialLogin from "../pages/Login/SocialLogin";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Logout from "../pages/Logout/Logout";
import PostDetails from "../components/PostDetails/PostDetails";
import Contact from "../components/Contacts/Contacts";
import About from "../components/About/About";
import Help from "../components/Help/Help";
import FaqDetails from "../components/Help/Faq/FaqDetails";
import Faq from "../components/Help/Faq/Faq";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
     {
        path: "login", // ❗ remove leading slash
        element: <Login />,
      },
      {
        path: "/createpost",
        element: <CreatePost></CreatePost>,
      },{
        path: "register",
        element: <Register></Register>,
      },
      {
        path:"logout",
        Component:Logout
      },{
        path: "/post/:id",
        element: <PostDetails />
      },
      {
        path:"contact",
        element:<Contact></Contact>
      },{
        path:"about",
        element:<About></About>
      },{
        path:"help",
        element:<Help></Help>
      },
      {
        path: "/help",
        element: <Help />
      },
      {
        path: "/faq",
        element: <Faq />
      },
      {
        path: "/faq/:id",
        element: <FaqDetails />
      }

    ],
    errorElement:<NotFound></NotFound>
  },
]);
