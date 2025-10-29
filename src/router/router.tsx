import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import AboutUs from "../components/Aboutus/AboutUs";
import CategoryChallenges from "../components/Challenges/CategoryChallenges";
import ChallengeDetails from "../components/Challenges/ChallengeDetails";
import MoreChallenge from "../components/Challenges/MoreChallenge";
import ReactChallenge from "../components/Challenges/ReactChallenge";
import CodePen from "../components/Codepen/CodePen";
import ContactUs from "../components/ContactUs/ContactUs";
import Planner from "../components/Planner/Planner";
import Dashboard from "../components/Dashboard/Dashboard";

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
        {
          path: "react-challenges",
          children: [
            { index: true, element: <ReactChallenge /> },
            {
              path: "challenge-details/:title",
              element: <ChallengeDetails />,
            },
          ],
        },
        {
          path: "more-challenges",
          children: [
            { index: true, element: <MoreChallenge /> },
            {
              path: ":categoryName", 
              element: <CategoryChallenges />,
            },
            {
              path: ":categoryName/challenge-details/:title",
              element: <ChallengeDetails />,
            },
          ],
        },
      ],
    },
  ],
 {
    basename: import.meta.env.BASE_URL,
  }

);
