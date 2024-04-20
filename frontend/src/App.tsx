import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { TasksPage } from "./pages/tasks";
import { MainLayout } from "./shared/ui/main-layout";
import { SignInPage } from "./pages/sign-in";
import { NotFoundPage } from "./pages/not-found";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: localStorage.getItem("token") ? (
          <TasksPage />
        ) : (
          <Navigate to="/sign_in" />
        ),
      },
      {
        path: "/sign_in",
        element: <SignInPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
