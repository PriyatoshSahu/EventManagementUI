import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

const AddEvent = () => {
    const [categories, setCategories] = useState([]);
    const [selectedImage1, setSelectImage1] = useState(null);
    const [event, setEvent] = useState({});
    const[successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    let navigate = useNavigate(); 

    const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");



    const retriveAllCategory = async() =>{
        const result = axios.get("/getcategory")
        return result.data;
    }


    const getAllCategories = async () => {
        const resCategory = await retriveAllCategory();
        if (resCategory) {
          setCategories(resCategory.categories);
        }
      };



    useEffect(()=>{
        getAllCategories();
    },[])

    

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEvent({ ...event, [name]: value });
  };

  const saveEvent = async (e)=>{
    e.preventDefault();

    if (event === null) {
        toast.error("invalid input!!!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
        return;
      }

      
    if (event.categoryId === "" || event.categoryId === "0") {
        toast.error("Select Category!!!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
        return;
      }

      
      if (event.venueType === "" || event.venueType === null) {
        toast.error("Select Venue Type!!!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
        return;
      }

      const formData = new FormData();
    formData.append("name", event.name);
    formData.append("description", event.description);
    formData.append("venueName", event.venueName);
    formData.append("venueType", event.venueType);
    formData.append("location", event.location);
    formData.append("image", selectedImage1);
    formData.append("noOfTickets", event.noOfTickets);
    formData.append("startDate", convertToEpochTime(event.startDate));
    formData.append("endDate", convertToEpochTime(event.endDate));
    formData.append("ticketPrice", event.ticketPrice);
    formData.append("categoryId", event.categoryId);
      
axios.post("/save/event" ,formData ,{
    headers:{
        Authorization:'bearer' +admin_jwtToken
    },
})
.then((res)=>{
    if(res.data.status === 200){
        setSuccessMessage(res.data.message);
        setTimeout(()=>{
            navigate("/home");
        },2000)
    }else{
        setErrorMessage(res.data.message);
    }
})
.catch((error)=>{
    console.log(error);
    setErrorMessage("not able to add event")
})


  }



  const convertToEpochTime = (dateString) => {
    const selectedDate = new Date(dateString);
    const epochTime = selectedDate.getTime();
    return epochTime;
  };
  
  
  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center mb-4">
        <div class="card form-card shadow-lg" style={{ width: "60rem" }}>
          <div className="container-fluid">

            <div className="card-header bg-color custom-bg-text mt-2 text-center" style={{borderRadius: "1em",height: "45px",}}>
              <h5 class="card-title">Add Event</h5>
            </div>

            <div class="card-body text-color">
              <form className="row g-3">
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="title" className="form-label">
                    <b>Event Title</b>
                  </label>
                  <input  type="text" className="form-control" id="name" name="name" onChange={handleInputChange}  value={event.name}/>
                </div>


                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Event Description</b>
                  </label>
                  <input type="text"   className="form-control" name="description" onChange={handleInputChange} value={event.description} />
                </div>



                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Event Category</b>
                  </label>

                  <select  name="categoryId"  onChange={handleInputChange} className="form-control">
                    <option value="">Select Event Category</option>
                    {categories.map((category) => {
                      return (
                        <option value={category.id}> {category.name} </option>
                      );
                    })}
                  </select>
                </div>





                <div className="col-md-6 mb-3">
                  <label htmlFor="title" className="form-label">
                    <b>Event Venue Name</b>
                  </label>
                  <input  type="text"  className="form-control"  id="venueName" name="venueName"  onChange={handleInputChange} value={event.venueName}/>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Event Venue Type</b>
                  </label>
                  <select name="venueType" onChange={handleInputChange} className="form-control" >
                    <option value="">Select Venue Type</option>
                    <option value="Conference Centers">
                      Conference Centers
                    </option>
                    <option value="Hotels">Hotels</option>
                    <option value="Banquet Halls">Banquet Halls</option>
                    <option value="Restaurants">Restaurants</option>
                    <option value="Ballrooms">Ballrooms</option>
                    <option value="Outdoor Venues">Outdoor Venues</option>
                    <option value="Stadiums/Arenas">Stadiums/Arenas</option>
                    <option value="Convention Centers">
                      Convention Centers
                    </option>
                    <option value="Theaters">Theaters</option>
                    <option value="Auditoriums">Auditoriums</option>
                    <option value="Museums/Galleries">Museums/Galleries</option>
                    <option value="Country Clubs">Country Clubs</option>
                    <option value="Historic Buildings/Venues">
                      Historic Buildings/Venues
                    </option>
                    <option value="Wineries/Vineyards">
                      Wineries/Vineyards
                    </option>
                    <option value="Resorts">Resorts</option>
                    <option value="Yachts/Boats">Yachts/Boats</option>
                    <option value="Farms/Ranches">Farms/Ranches</option>
                    <option value="Warehouses/Lofts">Warehouses/Lofts</option>
                    <option value="Churches/Temples/Mosques">
                      Churches/Temples/Mosques
                    </option>
                    <option value="Universities/Colleges">
                      Universities/Colleges
                    </option>
                  </select>
                </div>
                
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="street" className="form-label">
                    <b>Location</b>
                  </label> 
                  <input  type="text"  className="form-control" id="location"  name="location" onChange={handleInputChange} value={event.location} />
                </div>
               
               
                <div className="col-md-6 mb-3">
                  <label htmlFor="pincode" className="form-label">
                    <b>No. Of Tickets</b>
                  </label>
                  <input  type="number"  className="form-control"  id="noOfTickets"  name="noOfTickets"  onChange={handleInputChange}  value={event.noOfTickets}/>
                </div>
                
                
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="ticketPrice" className="form-label">
                    <b>Ticket Price</b>
                  </label>
                  <input   type="number"   className="form-control"   id="ticketPrice"   name="ticketPrice"   onChange={handleInputChange}   value={event.ticketPrice}/>
                </div>
 
 
 
                <div className="col-md-6 mb-3">
                  <label htmlFor="ticketPrice" className="form-label">
                    <b>Event Start Time</b>
                  </label>
                  <input  type="datetime-local"  className="form-control"  id="startDate"  name="startDate"  onChange={handleInputChange}  value={event.startDate}/>
                </div>
              
              
              
                <div className="col-md-6 mb-3">
                  <label htmlFor="ticketPrice" className="form-label">
                    <b>Event End Time</b>
                  </label>
                  <input    type="datetime-local"    className="form-control"    id="endDate"    name="endDate"    onChange={handleInputChange}value={event.endDate} />
                </div>
 


                <div className="col-md-6 mb-3">
                  <label for="formFile" class="form-label">
                    <b> Select Event Image</b>
                  </label>
                  <input class="form-control"  type="file" id="formFile" name="image" onChange={(e) => setSelectImage1(e.target.files[0])} required/>
                </div>
                
             
                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button type="submit" class="btn bg-color custom-bg-text" onClick={saveEvent} >
                    Add Event
                  </button>
                </div>
             
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default AddEvent