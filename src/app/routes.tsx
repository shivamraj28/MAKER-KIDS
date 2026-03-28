import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Rewards from "./pages/Rewards";
import Feedback from "./pages/Feedback";
import Chat from "./pages/Chat";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "projects", Component: Projects },
      { path: "projects/:id", Component: ProjectDetail },
      { path: "rewards", Component: Rewards },
      { path: "feedback", Component: Feedback },
      { path: "chat", Component: Chat },
      { path: "contact", Component: Contact },
      { path: "profile", Component: Profile },
    ],
  },
]);
