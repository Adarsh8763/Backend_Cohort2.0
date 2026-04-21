import { RouterProvider } from "react-router";
import { router } from "./AppRoutes";
import "./features/shared/global.scss";
import { AuthProvider } from "./features/auth/auth.context";
import { SongContextProvider } from "./features/home/song.context";

const App = () => {
  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthProvider>
  );
};

export default App;
