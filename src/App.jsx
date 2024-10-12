import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Clubs from "./components/clubs/Clubs";
import Login from "./components/login/Login";

import RoutingError from "./components/RoutingError";
import { UserLoginProvider } from './contexts/userLoginContext'; // Import provider
import Signup from "./components/signup/Signup"; // Import the Signup component// Import the StudentDashboard component
import StudentDashboard from "./components/events/StudentDashboard";
import AdminDashboard from "./components/events/AdminDashboard";
import Account from "./components/account/Account"; // Import Account component


function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <RoutingError />,
      children: [
        {
          index: true,
          element: <Home />,  // This will serve as the default path under "/"
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "clubs",
          element: <Clubs />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />, // Add Signup route here
        },
        {
          path: "events/StudentDashboard", // Add a route for the dashboard
          element: <StudentDashboard />,  // Renders StudentDashboard when user visits /dashboard
        },
        
        {
          path: "events/AdminDashboard", // Add a route for the dashboard
          element: <AdminDashboard />,  // Renders StudentDashboard when user visits /dashboard
        },
        {
          path: "account", // Add route for Account page
          element: <Account />, // Renders Account component when user visits /account
        },

      ],
    },
  ]);

  return (
    <UserLoginProvider> {/* Wrap your app in the provider */}
      <div className="main">
        <RouterProvider router={browserRouter} />
      </div>
    </UserLoginProvider>
  );
}

export default App;
