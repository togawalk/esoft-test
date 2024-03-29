import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TasksPage } from "./pages/tasks";
import { MainLayout } from "./shared/ui/main-layout";
import { SignInPage } from "./pages/sign-in";

const router = createBrowserRouter(
  [
    {
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <TasksPage />,
        },
        {
          path: '/sign_in',
          element: <SignInPage />,
        },
      ],
    },
  ])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
