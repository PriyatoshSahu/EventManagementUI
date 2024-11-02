import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '/node_modules/bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRegister from "./Component/Usercomponent/AdminRegister";
import UserLogin from "./Component/Usercomponent/UserLogin";
import UserRegister from "./Component/Usercomponent/UserRegister";
import ViewCstomer from "./Component/Usercomponent/ViewCstomer";
import Caraousel from "./Component/PageComponent/Caraousel";
import HomePage from "./Component/PageComponent/HomePage";
import Header from "./Component/NavBarComponent/Header";
import NavBar from "./Component/NavBarComponent/NavBar";
import Footerr from "./Component/NavBarComponent/Footerr";
import AdminHeader from "./Component/NavBarComponent/AdminHeader";
import HeaderCustomer from "./Component/NavBarComponent/HeaderCustomer";
import NormalHeader from "./Component/NavBarComponent/NormalHeader";
import RoleNav from "./Component/NavBarComponent/RoleNav";
import AddEvent from "./Component/EventComponent/AddEvent";
import EventBooking from "./Component/EventComponent/EventBooking";
import EventCard from "./Component/EventComponent/EventCard";
import UpdateEvent from "./Component/EventComponent/UpdateEvent";
import ViewAllEvent from "./Component/EventComponent/ViewAllEvent";
import ViewAllEventBooking from "./Component/EventBookingComponent/ViewAllEventBooking";
import ViewCustomerEventBookings from "./Component/EventBookingComponent/ViewCustomerEventBookings";
import AddCategoryForm from "./Component/CategoryComponent/AddCategoryForm";
import ViewAllCategories from "./Component/CategoryComponent/ViewAllCategories";
import UpdateCategoryForm from "./Component/CategoryComponent/UpdateCategoryForm";
import ViewAllCustomers from "./Component/Usercomponent/ViewAllCustomers";
import EventDetailPage from "./Component/EventComponent/EventDetailPage";
const App = () => {
  return (
    <>
    <Header/>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/user/admin/register" element={<AdminRegister/>}></Route>
        <Route path="/user/login" element={<UserLogin/>}></Route>
        <Route path="/user/customer/register" element={<UserRegister/>}></Route>
        <Route path="/user/manager/register" element={<UserRegister/>}></Route>       
        <Route path="/admin/event/category/add" element={<AddCategoryForm/>}></Route>       
        <Route path="/admin/event/category/all" element={<ViewAllCategories/>}></Route>       
        <Route path="/admin/event/category/update" element={<UpdateCategoryForm/>}></Route>       
        <Route path="/admin/customer/all" element={<ViewAllCustomers/>}></Route>       
        <Route path="/admin/event/add" element={<AddEvent/>}></Route>       
        <Route path="/event/:eventId/detail" element={<EventDetailPage/>}></Route>       
        <Route path="/event/booking/page" element={<EventBooking/>}></Route>       
        <Route path="/admin/event/all"  element={<ViewAllEvent/>}></Route>       
        <Route path="/admin/event/update" element={<UpdateEvent/>}></Route>       
        <Route path="/admin/event/booking/all" element={<ViewAllEventBooking/>}></Route>  
        <Route path="/customer/event/booking/all" element={<ViewCustomerEventBookings/>}></Route>
      </Routes>
    </Router>
    </>
  );
};

export default App;
