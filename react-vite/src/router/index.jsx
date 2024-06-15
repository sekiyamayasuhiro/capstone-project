import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../components/HomePage";
import TestingPage from "../components/TestingPage";
import LeagueIndex from "../components/League/LeagueIndex";
import LeagueDetails from "../components/League/LeagueDetails";
import TeamDetails from "../components/Team";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "testing",
                element: <TestingPage />,
            },
            {
                path: "leagues",
                element: <LeagueIndex />,
            },
            {
                path: "leagues/:leagueId",
                element: <LeagueDetails />,
            },
            {
                path: "leagues/:leagueId/teams/:teamId",
                element: <TeamDetails />,
            },
        ],
    },
]);
