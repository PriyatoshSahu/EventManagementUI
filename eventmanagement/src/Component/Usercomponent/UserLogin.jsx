import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "./UserLogin.css"

const UserLogin = () => {

    const navigate= useNavigate();

    const[loginRequest,setLoginRequest] = useState({
    email:"",
    password:"",
    role:""
});

const handleInputChange =(e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginRequest({...loginRequest,[name]:value});
}


const handleLogin = async (e)=>{
    e.preventDefault();
    const result = await UserLogin(loginRequest);
    const response = result.data;
    if(response.success){
        console.log("user login response")
        if(response.jwtToken){
            const userRole = response.user.role;
            const activeUserKey = userRole === "Admin" ? "active-admin" : "active-customer";
            const jwtTokenKey = userRole === "Admin" ? "admin-jwtToken" : "customer-jwtToken";
    
            sessionStorage.setItem(activeUserKey, JSON.stringify(response.user));
            sessionStorage.setItem(jwtTokenKey, response.jwtToken);


            // display the success message
            toast.success(response.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              setTimeout(() => {
                window.location.href = "/home";
              }, 1000); // Redirect after 1 second
            } 

            else {
              showError(response.responseMessage);
            }
          } 
          else {
            showError(response.responseMessage);
          }
        }
    

        const showError = (message) => {
            toast.error(message, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
        }

    return (
        <div>
          <div className=" first mt-2 d-flex aligns-items-center justify-content-center">
            <div className="form-card border-color" style={{ width: "25rem" }}>
              <div className="container-fluid">
                <div
                  className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
                  style={{
                    borderRadius: "1em",
                    height: "38px",
                  }}
                >
                  <h4 className="card-title">User Login</h4>
                </div>
                <div className="card-body mt-3">
                  <form>
                    <div class="mb-3 text-color">
                      <label for="role" class="form-label"> 
                        <b>User Role</b>
                      </label>
                      <br></br>
                      <select
                        onChange={handleInputChange}
                        className="form-control"
                        name="role"
                      >
                        <option value="0">Select Role</option>
                        <option value="Admin"> Admin </option>
                        <option value="Customer"> Customer </option>
                      </select>
                    </div>
    
                    <div className="mb-3 text-color">
                      <label for="emailId" class="form-label">
                        <b>Email Id</b>
                      </label>
                      <br></br>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={handleInputChange}
                        value={loginRequest.email} />


                    </div>
                    <div className="mb-3 text-color">
                      <label for="password" className="form-label">
                        <b>Password</b>
                      </label>
                      <br></br>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={handleInputChange}
                        value={loginRequest.password}
                        autoComplete="on"/>


                    </div>
                    <div className="d-flex aligns-items-center justify-content-center mb-2">
                      <button
                        type="submit"
                        className="btn bg-color custom-bg-text"
                        onClick={handleLogin}>
                        Login
                      </button>
                      <ToastContainer />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
export default UserLogin