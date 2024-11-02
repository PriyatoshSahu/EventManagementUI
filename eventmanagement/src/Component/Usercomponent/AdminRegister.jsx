import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css"; 
import { createAdmin } from '../utils/Apifunction';
import { toast, ToastContainer } from 'react-toastify';

const AdminRegister = () => {
    const navigate = useNavigate();

    const[registerRequest,setRegisterRequest] = useState({});

    const handleChange = (e) => {
        setRegisterRequest({...registerRequest,[e.target.name] : e.target.value})
    }


const handleRegistration = async (e)=>{
    e.preventDefault();
    const success   =  await createAdmin(registerRequest);

    if(success !== undefined){
        toast.success("Admin Register Successfully",{
            position:'top-center',
            autoClose:2000,
            hideProgressBar:false,
            closeOnClick:true,
            pauseOnHover:true,
            draggable:true,
            theme:"light"
        });
        setTimeout(()=>{
            navigate("");
        },1000)
    }
    else{
        toast.error("admin not registered",{
            position:'top-center',
            autoClose:2000,
            hideProgressBar:false,
            closeOnClick:true,
            pauseOnHover:true,
            draggable:true
        })
        setTimeout(()=>{
            window.location.reload(true);
        },1000)
    }
}

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="form-card" style={{ width: '300px' }}>
            <form onSubmit={handleRegistration}>
                <h3 className="text-center mb-4">Admin Register</h3>
                <div className="mb-3">
                    <label htmlFor="adminEmail" className="form-label">Admin Email</label> <br></br>
                    <input
                        type="email"
                        id="adminEmail"
                        className="form-control"
                        value={registerRequest.email}
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label> <br></br>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={registerRequest.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    </div>
  )
}

export default AdminRegister