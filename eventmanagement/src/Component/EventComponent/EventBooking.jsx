import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import creditcard from '../../Component/Image/credit-card.png';
import { ToastContainer, toast } from "react-toastify";

const EventBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId } = useParams();
  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const admin_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const [event, setEvent] = useState({});
  const [paymentRequest, setPaymentRequest] = useState({
    Id: event?.Id || "",
    customerId: customer?.id || "",
    cardNo: "",
    nameOnCard: "",
    noOfTickets: "",
    cvv: "",
    expiryDate: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPaymentRequest({ ...paymentRequest, [name]: value });
  };

  const payAndConfirmBooking = async (e) => {
    e.preventDefault();
    
    try {
      const result = await axios.post("http://localhost:8080/api/booking/add", paymentRequest, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin_jwtToken}`
        },
      });
      
      const res = result.data;

      if (res.success) {
        setSuccessMessage(res.responseMessage);
        toast.success(res.responseMessage);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        setErrorMessage(res.responseMessage);
        toast.error(res.responseMessage);
      }
    } 
    catch (error) {
      console.error(error);
      setErrorMessage("It seems the server is down");
      toast.error("It seems the server is down");
    }
  };

  return (
    <div className="mb-3">
      <div className="col ml-5 mt-3 ms-5 me-5">
        {/* Event Details Card */}
        <div className="card rounded-card h-100 shadow-lg">
          <div className="row g-0">
            <div className="col-md-6">
              <div className="card-body">
                <h4 className="card-title text-color-second">Event Details</h4>
                <div className="row g-0">
                  <div className="col-md-4 d-flex align-items-center justify-content-center">
                    {event.image && (
                      <img
                        src={`http://localhost:8080/api/event/${event.image}`}
                        className="card-img-top rounded img-fluid"
                        alt="event"
                        style={{ maxHeight: "100px", width: "auto" }}
                      />
                    )}
                  </div>
                  <div className="col-md-8">
                    <div className="card-body text-color">
                      <h3 className="card-title text-color-second">
                        <b>{event.name}</b>
                      </h3>
                      <b className="card-text">{event.description}</b>
                      <br />
                      <b className="card-text">{event.location}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Venue Details Card */}
            <div className="col-md-6">
              <div className="card-body">
                <h4 className="card-title text-color-second">Venue Details</h4>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Venue Name:</b> {event.venueName}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Venue Type:</b> {event.venueType}
                    </p>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Location:</b> {event.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="card rounded-card h-100 shadow-lg mt-4">
          <div className="text-color-second text-center">
            <h4>Book an Event here!</h4>
            <div className="row mt-4">
              <div className="col-sm-4 mt-2">
                <img src={creditcard} className="card-img-top rounded img-fluid" alt="img" style={{ maxWidth: "300px" }} />
              </div>
              <div className="col-sm-4 mt-2">
                <form className="row g-3" onSubmit={payAndConfirmBooking}>
                  <input type="number" className="form-control" id="noOfTickets" name="noOfTickets" onChange={handleInputChange} value={paymentRequest.noOfTickets} placeholder="No. of Tickets..." required />
                  <input type="text" className="form-control" id="nameOnCard" name="nameOnCard" onChange={handleInputChange} value={paymentRequest.nameOnCard} placeholder="Name on Card..." required />
                  <input type="number" className="form-control" id="cardNo" name="cardNo" onChange={handleInputChange} value={paymentRequest.cardNo} placeholder="Enter Card Number here..." required />
                  <input type="text" className="form-control" id="expiryDate" name="expiryDate" onChange={handleInputChange} value={paymentRequest.expiryDate} placeholder="Valid Through" required />
                  <input type="number" className="form-control" id="cvv" name="cvv" onChange={handleInputChange} value={paymentRequest.cvv} placeholder="CVV" required />
                  <input type="submit" className="btn bg-color custom-bg-text ms-2" value="Book Event" />
                  <ToastContainer />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventBooking;
