import { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notfound from "./pages/Notfound";
import { Outlet, RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import { useAppDispatch } from "./redux/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./redux/features/user/UserSlice";
import { auth } from "./lib/firebase";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(setLoading(true));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // dispatch(setLoading(false));
        dispatch(setUser(user.email));
      } else {
        // dispatch(setLoading(false));
      }
    });
  }, [dispatch]);
  return (
    <div className="mx-20">
      <Header />
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
