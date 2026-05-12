import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx"

const AppRoutes = createBrowserRouter([
    {
        path: "/register",
        element: <Register/>
    }
])