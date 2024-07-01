import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = ({ Component }) => {
  const token = localStorage.getItem("access-token");
  const navigate = useNavigate();
  var User = JSON?.parse(localStorage?.getItem("userDetail"));
 

  let userRole = User?.Role?.title;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  if (userRole === "superAdmin") {
    return Component;
  }
  return navigate("/");
};

export default AdminDashboard;
