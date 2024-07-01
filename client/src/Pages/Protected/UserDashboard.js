import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = ({ Component }) => {
  const token = localStorage.getItem("access-token");
  const navigate = useNavigate();
  var User = JSON.parse(localStorage.getItem("userDetail"));
  let userRole = User?.Role?.title;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  if (userRole === "CFO" && token) {
    return Component;
  } else {
    return navigate("/");
  }
};

export default UserDashboard;
