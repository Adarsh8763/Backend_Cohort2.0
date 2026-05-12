import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx"
import Login from "../features/auth/pages/Login.jsx"

const AppRoutes = createBrowserRouter([
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/",
        element: <h1>Home Page</h1>
    },
    {
        path: "/login",
        element: <Login/>
    }
])

export default AppRoutes