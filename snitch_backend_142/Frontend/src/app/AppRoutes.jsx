import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import CreateProduct from "../features/products/pages/CreateProduct.jsx";
import Protected from "../features/auth/components/Protected.jsx";
import Dashboard from "../features/products/pages/Dashboard.jsx";
import Home from "../features/products/pages/Home.jsx"
import ProductDetails from "../features/products/pages/ProductDetails.jsx";

const AppRoutes = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/product/:productId",
    element: <ProductDetails/>
  },
  {
    path: "/seller",
    children: [
      {
        path: "/seller/create-product",
        element: (
          <Protected>
            <CreateProduct />
          </Protected>
        ),
      },
      {
        path: "/seller/dashboard",
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
      },
    ],
  },
]);

export default AppRoutes;
