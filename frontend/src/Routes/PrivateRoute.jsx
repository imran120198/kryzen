import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Privateroute({ children }) {
  const { isAuth } = useSelector((state) => state.auth);

  if (!isAuth) {
    return <Navigate to="/" />;
  }
  return children;
}
