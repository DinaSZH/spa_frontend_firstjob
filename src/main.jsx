import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
// import './index.css'
import "./styles/all.css";
import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./store/store";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home/Home";
import KeycloakService from "./services/KeycloakService";
import CreateResume from "./pages/create-resume/CreateResume";
import Profile from "./pages/profile/Profile";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import EditProfile from "./pages/profile/editProfile/EditProfile";
import SignupHR from "./pages/HR/SignupHR";
import SignupMentor from "./pages/Mentor/SignupMentor";
import AuthLayout from "./layout/Auth/AuthLayout";
import Resumes from "./pages/resumes/Resumes";
import SearchVacancy from "./pages/search/searchVacancy/SearchVacancy";
import Register from "./pages/register/Register";
import RenderOnAnonymous from "./helpers/RenderOnAnonymous";
import RenderOnAuthenticated from "./helpers/RenderOnAuthenticated";
import { NotFound } from "./pages/NotFound/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ResumeId from "./pages/resumes/ResumeId";
import EditResume from "./pages/resumes/EditResume";
import Vacancies from "./pages/vacancies/Vacancies";
import CreateVacancy from "./pages/create-vacancy/CreateVacancy";
import VacancyId from "./pages/vacancies/VacancyId";
import EditVacancy from "./pages/vacancies/EditVacancy";
import CreateTest from "./pages/create-test/CreateTest";
import Tests from "./pages/tests/Tests";
import VacancyApplies from "./pages/vacancyApplies/VacancyApplies";
import UserApplies from "./pages/user-applies/UserApplies";
import HrApplies from "./pages/hr-applies/HrApplies";
import { News } from "./pages/news/News";
import { NewsById } from "./pages/news/NewsById";
import { Mentors } from "./pages/Mentor/Mentors";
import { MentorsById } from "./pages/Mentor/MentorsById";
import CreateMentor from "./pages/create-mentor/CreateMentor";
import PlatformTest from "./pages/platform-test/PlatformTest";
import UserCertifications from "./pages/UserCertifications/UserCertifications";
import MentorProfile from "./pages/MentorProfile/MentorProfile";
import EditMentor from "./pages/edit-mentor/EditMentor";
import ResumeDB from "./pages/resumeDB/ResumeDB";
import TestId from "./pages/tests/TestId";
import RenderOnUser from "./helpers/RenderOnUser";
import RenderOnHR from "./helpers/RenderOnHR";
import RenderOnMentor from "./helpers/RenderOnMentor";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <RequireAuth><Layout /></RequireAuth>,
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create-resume",
        element: (
          <RenderOnUser>
            <CreateResume />
          </RenderOnUser>
        ),
      },
      {
        path: "/profile",
        element: (
          <RenderOnAuthenticated>
            <Profile />
          </RenderOnAuthenticated>
        ),
      },
      {
        path: "/profile/edit",
        element: (
          <RenderOnAuthenticated>
            {" "}
            <EditProfile />{" "}
          </RenderOnAuthenticated>
        ),
      },
      {
        path: "/search/vacancy",
        element: <SearchVacancy />,
      },
      {
        path: "/resumes",
        element: (
          <RenderOnUser>
            {" "}
            <Resumes />
          </RenderOnUser>
        ),
      },
      {
        path: "/resumes/:id",
        element: (
          <RenderOnAuthenticated>
            {" "}
            <ResumeId />
          </RenderOnAuthenticated>
        ),
      },
      {
        path: "/resumes/edit/:id",
        element: (
          <RenderOnUser>
            <EditResume />
          </RenderOnUser>
        ),
      },
      {
        path: "/create-vacancy",
        element: (
          <RenderOnHR>
            <CreateVacancy />
          </RenderOnHR>
        ),
      },
      {
        path: "/vacancies",
        element: <Vacancies />,
      },
      {
        path: "/vacancies/:id",
        element: <VacancyId />,
      },
      {
        path: "/vacancy/edit/:id",
        element: (
          <RenderOnHR>
            {" "}
            <EditVacancy />
          </RenderOnHR>
        ),
      },
      {
        path: "/create-test",
        element: (
          <RenderOnHR>
            <CreateTest />
          </RenderOnHR>
        ),
      },
      {
        path: "/tests",
        element: (
          <RenderOnAuthenticated>
            {" "}
            <Tests />
          </RenderOnAuthenticated>
        ),
      },
      {
        path: "/tests/:id",
        element: (
          <RenderOnAuthenticated>
            {" "}
            <TestId />
          </RenderOnAuthenticated>
        ),
      },
      {
        path: "/applies/vacancy/:id",
        element: (
          <RenderOnHR>
            <VacancyApplies />
          </RenderOnHR>
        ),
      },
      {
        path: "/applies",
        element: (
          <RenderOnUser>
            {" "}
            <UserApplies />
          </RenderOnUser>
        ),
      },
      {
        path: "/applies/hr",
        element: (
          <RenderOnHR>
            <HrApplies />
          </RenderOnHR>
        ),
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/news/:id",
        element: <NewsById />,
      },
      {
        path: "/mentors",
        element: <Mentors />,
      },
      {
        path: "/mentors/:id",
        element: <MentorsById />,
      },
      {
        path: "/create-mentor",
        element: (
          <RenderOnMentor>
            <CreateMentor />
          </RenderOnMentor>
        ),
      },
      {
        path: "/edit-mentor",
        element: (
          <RenderOnMentor>
            <EditMentor />
          </RenderOnMentor>
        ),
      },
      {
        path: "/profile/mentor",
        element: <MentorProfile />,
      },
      {
        path: "/platform/tests",
        element: <PlatformTest />,
      },
      {
        path: "/user/certifications",
        element: (
          <RenderOnAuthenticated>
            <UserCertifications />
          </RenderOnAuthenticated>
        ),
      },
      {
        path: "/allResumes",
        element: (
          <RenderOnAuthenticated>
            <ResumeDB />
          </RenderOnAuthenticated>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: (
      <RenderOnAnonymous>
        <AuthLayout />
      </RenderOnAnonymous>
    ),
    children: [
      {
        path: "",
        element: <Register />,
      },
      {
        path: "mentor",
        element: <SignupMentor />,
      },
      {
        path: "hr",
        element: <SignupHR />,
      },
    ],
  },

  {
    path: "*",

    element: <NotFound />,
  },
]);

const _axios = axios.create({
  baseURL: "https://erah07zkak.execute-api.eu-central-1.amazonaws.com",
});
_axios.interceptors.request.use((config) => {
  if (UserService.isLoggedIn()) {
    const cb = () => {
      config.headers.Authorization = `Bearer ${UserService.getToken()}`;
      return Promise.resolve(config);
    };
    return UserService.updateToken(cb);
  }
});
const queryClient = new QueryClient();

const renderApp = async () => {
  try {
    await KeycloakService.initKeycloak(() => {});

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <MantineProvider>
            <Provider store={store}>
              <RouterProvider router={router} />
            </Provider>
          </MantineProvider>
        </QueryClientProvider>
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Error initializing Keycloak:", error);
  }
};

renderApp();
