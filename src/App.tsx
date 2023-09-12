import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useAppDispatch } from "./redux/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./redux/features/user/UserSlice";
import { auth } from "./lib/firebase";
import Footer from "./components/Footer";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email));
      }
    });
  }, [dispatch]);
  return (
    <div className="mx-20">
      <Header />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
