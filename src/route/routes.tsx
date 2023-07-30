import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Notfound from "../pages/Notfound";
import Books from "../components/Books";
import AddNewBook from "../pages/AddNewBook";
import ProtectedRoute from "./ProtectedRoute";
import SingleBookDetails from "../pages/SingleBookDetails";
import EditBook from "../pages/EditBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/add-new-book",
        element: (
          <ProtectedRoute>
            <AddNewBook />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-book/:id",
        element: (
          <ProtectedRoute>
            <EditBook />
          </ProtectedRoute>
        ),
      },
      {
        path: "/book-details/:id",
        element: (
          <ProtectedRoute>
            <SingleBookDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <Notfound />,
  },
]);

export default router;
