import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notfound from "./pages/Notfound";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";

function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Home />,
  //   },
  //   {
  //     path: "/signup",
  //     element: <Signup />,
  //   },
  //   {
  //     path: "/login",
  //     element: <Login />,
  //   },
  //   {
  //     path: "*",
  //     element: <Notfound />,
  //   },
  // ]);

  return (
    <>
      <Header />
      {/* <RouterProvider router={router} /> 
      {/* <h3>app</h3> */}
    </>
  );
}

export default App;
