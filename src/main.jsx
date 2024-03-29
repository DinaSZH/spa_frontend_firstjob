import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import './styles/all.css'
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
// import { Error } from './pages/Error/Error.tsx';
// import { Layout } from './layout/Menu/Layout.tsx';
// import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import axios from 'axios';
// import { PREFIX } from './helpers/API.ts';
// import { Login } from './pages/Login/Login.tsx';
// import { Register } from './pages/Register/Register.tsx';
// import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import KeycloakService from './services/KeycloakService';
// import { store } from './store/store.ts';
// import { Success } from './components/Success/Success.tsx';
import CreateResume from './pages/create-resume/CreateResume';
import Profile from './pages/profile/Profile';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider } from '@mantine/core';
import EditProfile from './pages/profile/editProfile/EditProfile';
import SignupHR from './pages/HR/SignupHR';
import SignupMentor from './pages/Mentor/SignupMentor';
import AuthLayout from './layout/Auth/AuthLayout';
import Resumes from './pages/resumes/Resumes';
import SearchVacancy from './pages/search/searchVacancy/SearchVacancy';
import Register from './pages/register/Register';
import RenderOnAnonymous from './helpers/RenderOnAnonymous';
import RenderOnAuthenticated from './helpers/RenderOnAuthenticated';
import { NotFound } from './pages/NotFound/NotFound';
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
  } from '@tanstack/react-query'
import ResumeId from './pages/resumes/ResumeId';
import EditResume from './pages/resumes/EditResume';
import Vacancies from './pages/vacancies/Vacancies';
import CreateVacancy from './pages/create-vacancy/CreateVacancy';
import VacancyId from './pages/vacancies/VacancyId';
import EditVacancy from './pages/vacancies/EditVacancy';
import CreateTest from './pages/create-test/CreateTest';
import Tests from './pages/tests/Tests';
  

const router = createBrowserRouter([
	{
		path: '/',
		// element: <RequireAuth><Layout /></RequireAuth>,
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <Home />
			},
      		{
				path: '/create-resume',
				element: <CreateResume />
			},
			{
				path: '/profile',
				element: <RenderOnAuthenticated><Profile /></RenderOnAuthenticated> 
			},
			{
				path: '/profile/edit',
				element: <EditProfile />,
			},
			{
				path: '/search/vacancy',
				element: <SearchVacancy />,
			},
			{
				path: '/resumes',
				element: <Resumes />,
			},
			{
				path: '/resumes/:id',
				element: <ResumeId />,
			},
			{
				path: '/resumes/edit/:id',
				element: <EditResume />,
			},
			{
				path: '/vacancies',
				element: <Vacancies />,
			},
			{
				path: '/vacancies/:id',
				element: <VacancyId />,
			},
			{
				path: '/create-vacancy',
				element: <CreateVacancy />
			},
			{
				path: '/vacancy/edit/:id',
				element: <EditVacancy />,
			},
			{
				path: '/create-test',
				element: <CreateTest />
			},
			{
				path: '/tests',
				element: <Tests />
			}
		]
	},
	{
		path: '/register',
		element: <RenderOnAnonymous><AuthLayout /></RenderOnAnonymous>,
		children: [
			{
				path: '',
				element: <Register />
			},
			{
				path: 'mentor',
				element: <SignupMentor />
			}, {
				path: 'hr',
				element: <SignupHR />
			}
		]
	},
	// {
	// 	path: '/test',
	// 	element: <RenderOnAnonymous><AuthLayout /></RenderOnAnonymous>,
	// 	children: [
	// 		{
	// 			path: '',
	// 			element: <Register />
	// 		},
	// 	]
	// },
	{
		path: '*',
		// element: <RequireAuth><Layout /></RequireAuth>,
		element: <NotFound />
	},
]);

const _axios = axios.create({ baseURL: 'https://erah07zkak.execute-api.eu-central-1.amazonaws.com' });
_axios.interceptors.request.use((config) => {
  if (UserService.isLoggedIn()) {
    const cb = () => {
      config.headers.Authorization = `Bearer ${UserService.getToken()}`;
      return Promise.resolve(config);
    };
    return UserService.updateToken(cb);
  }
});
const queryClient = new QueryClient()

const renderApp = async () => {
	try {
	  await KeycloakService.initKeycloak(() => {});
  
	  const root = ReactDOM.createRoot(document.getElementById('root'));
	  root.render(
		<React.StrictMode>
		  <QueryClientProvider client={queryClient}>
			<MantineProvider>
				<Provider store={store}>
				<RouterProvider router={router} />
				</Provider>
			</MantineProvider>
		  </QueryClientProvider>
		</React.StrictMode>,
	  );
	} catch (error) {
	  console.error("Error initializing Keycloak:", error);
	}
  };
  
  renderApp();
  