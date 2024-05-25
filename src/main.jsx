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
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import RenderOnAnonymous from "./helpers/RenderOnAnonymous";
import RenderOnAuthenticated from "./helpers/RenderOnAuthenticated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RenderOnUser from "./helpers/RenderOnUser";
import RenderOnHR from "./helpers/RenderOnHR";
import RenderOnMentor from "./helpers/RenderOnMentor";
import SearchVacancy from "./pages/search/searchVacancy/SearchVacancy";
////////////////////////////
const CreateResume = React.lazy(() =>
  import("./pages/create-resume/CreateResume")
);
const Profile = React.lazy(() => import("./pages/profile/Profile"));
const EditProfile = React.lazy(() =>
  import("./pages/profile/editProfile/EditProfile")
);
const SignupHR = React.lazy(() => import("./pages/HR/SignupHR"));
const SignupMentor = React.lazy(() => import("./pages/Mentor/SignupMentor"));
const Resumes = React.lazy(() => import("./pages/resumes/Resumes"));
const Register = React.lazy(() => import("./pages/register/Register"));
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));
const ResumeId = React.lazy(() => import("./pages/resumes/ResumeId"));
const EditResume = React.lazy(() => import("./pages/resumes/EditResume"));
const Vacancies = React.lazy(() => import("./pages/vacancies/Vacancies"));
const CreateVacancy = React.lazy(() =>
  import("./pages/create-vacancy/CreateVacancy")
);
const VacancyId = React.lazy(() => import("./pages/vacancies/VacancyId"));
const EditVacancy = React.lazy(() => import("./pages/vacancies/EditVacancy"));
const CreateTest = React.lazy(() => import("./pages/create-test/CreateTest"));
const Tests = React.lazy(() => import("./pages/tests/Tests"));
const UserApplies = React.lazy(() =>
  import("./pages/user-applies/UserApplies")
);
const HrApplies = React.lazy(() => import("./pages/hr-applies/HrApplies"));
const News = React.lazy(() => import("./pages/news/News"));
const NewsById = React.lazy(() => import("./pages/news/NewsById"));
const Mentors = React.lazy(() => import("./pages/Mentor/Mentors"));
const MentorsById = React.lazy(() => import("./pages/Mentor/MentorsById"));
const CreateMentor = React.lazy(() =>
  import("./pages/create-mentor/CreateMentor")
);
const PlatformTest = React.lazy(() =>
  import("./pages/platform-test/PlatformTest")
);
const UserCertifications = React.lazy(() =>
  import("./pages/UserCertifications/UserCertifications")
);
const MentorProfile = React.lazy(() =>
  import("./pages/MentorProfile/MentorProfile")
);
const EditMentor = React.lazy(() => import("./pages/edit-mentor/EditMentor"));
const ResumeDB = React.lazy(() => import("./pages/resumeDB/ResumeDB"));
const TestId = React.lazy(() => import("./pages/tests/TestId"));

//////////
const router = createBrowserRouter([
  {
    path: "/",
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
            <EditProfile />
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
            <Resumes />
          </RenderOnUser>
        ),
      },
      {
        path: "/resumes/:id",
        element: (
          <RenderOnAuthenticated>
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
            <Tests />
          </RenderOnAuthenticated>
        ),
      },
      {
        path: "/tests/:id",
        element: (
          <RenderOnAuthenticated>
            <TestId />
          </RenderOnAuthenticated>
        ),
      },
      {
        path: "/applies",
        element: (
          <RenderOnUser>
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
      {
        path: "/register",
        element: (
          <RenderOnAnonymous>
            <Register />
          </RenderOnAnonymous>
        ),
      },
      {
        path: "/register/mentor",
        element: (
          <RenderOnAnonymous>
            <SignupMentor />
          </RenderOnAnonymous>
        ),
      },
      {
        path: "/register/hr",
        element: (
          <RenderOnAnonymous>
            <SignupHR />
          </RenderOnAnonymous>
        ),
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
