import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface IProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: IProps) {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const pathName = useLocation();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user.email && !isLoading) {
    return <Navigate to="/login" state={{ path: pathName }} />;
  }
  return children;
}
