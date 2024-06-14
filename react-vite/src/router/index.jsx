import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import HomePage from "../components/HomePage";
import TestingPage from "../components/TestingPage";
import LeagueIndex from "../components/League/LeagueIndex";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            // {
            //     path: "login",
            //     element: <LoginFormPage />,
            // },
            // {
            //     path: "signup",
            //     element: <SignupFormPage />,
            // },
            {
                path: "testing",
                element: <TestingPage />,
            },
            {
                path: "leagues",
                element: <LeagueIndex />,
            },
        ],
    },
]);
