import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import AboutUs from "../components/Aboutus/AboutUs";
import ContactUs from "../components/ContactUs/ContactUs";
import Dashboard from "../components/Dashboard/Dashboard";
import Planner from "../components/Planner/Planner";
import CodePen from "../components/Codepen/CodePen";
import MoreChallenge from "../components/Challenges/MoreChallenge";
import ReactChallenge from "../components/Challenges/ReactChallenge";


export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "about-us", element: <AboutUs /> },
        { path: "contact-us", element: <ContactUs /> },
        { path: "my-planner", element: <Planner /> },
        { path: "codepen", element: <CodePen /> },
        { path: "more-challenges", element: <MoreChallenge /> },
        { path: "react-challenges", element: <ReactChallenge /> },
      ],
    },
  ],
  {
    basename: import.meta.env.MODE === "production" ? "/fed" : "/",
  }
);
