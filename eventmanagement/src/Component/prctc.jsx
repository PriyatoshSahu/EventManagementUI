import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const UserRegister = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phoneNo: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
  });

  useEffect(() => {
    if (document.URL.includes("customer")) {
      setUser((prevUser) => ({ ...prevUser, role: "Customer" }));
    } else if (document.URL.includes("manager")) {
      setUser((prevUser) => ({ ...prevUser, role: "Manager" }));
    }
  }, []);


//   simplified version

//   useEffect(() => {
//     const roles = {
//       customer: "Customer",
//       manager: "Manager",
//     };
  
//     const foundRole = Object.keys(roles).find(role => document.URL.includes(role));
//     if (foundRole) {
//       setUser(prevUser => ({ ...prevUser, role: roles[foundRole] }));
//     }
//   }, []);
  



  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/user/register", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const res = response.data;

      if (res.success) {
        toast.success(res.responseMessage, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setTimeout(() => {
          navigate("/user/login");
        }, 1000);
      } else {
        showError(res.responseMessage);
      }
    } catch (error) {
      console.error(error);
      showError("It seems server is down");
    }
  };

  const showError = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setTimeout(() => {
      window.location.reload(true);
    }, 1000);
  };

  return (
    <div>
      {/* Your form layout goes here */}
      <ToastContainer />
    </div>
  );
};

export default UserRegister;