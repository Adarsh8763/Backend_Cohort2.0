import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx"
import Login from "../features/auth/pages/Login.jsx"
import CreateProduct from "../features/products/pages/CreateProduct.jsx"

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
    },{
        path: "/seller/create-product",
        element: <CreateProduct/>
    }
])

export default AppRoutes