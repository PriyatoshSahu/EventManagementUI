import { Link } from "react-router-dom";
import dollor from "../Image/dollor_logo.png";
import timing from "../Image/timing_logo.png";
import experience from "../Image/experience_logo.png";

const EventCard = ({ item }) => {
  const descriptionToShow = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      const truncatedText = description.substring(0, maxLength);
      return truncatedText + "...";
    }
  };

  if (!item) {
    return <div>No event data available</div>; // Return something if item is undefined
  }

  return (
    <div className="col">
      <Link
        to={`/event/${item.id}/detail`}
        className="card job-card rounded-card h-100 shadow-lg"
        style={{ textDecoration: "none" }}
      >
        <div className="row g-0">
          {/* Left side - Company Logo */}
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img
              src={`http://localhost:8080/api/event/${item.image}`}
              className="card-img-top rounded img-fluid"
              alt="event image"
            />
          </div>
          {/* Right side - Job Details */}
          <div className="col-md-8">
            <div className="card-body text-color">
              <h3 className="card-title d-flex justify-content-between text-color-second">
                <div>
                  <b>{item.name}</b>
                </div>
              </h3>
              <b className="card-text">
                {descriptionToShow(item.description, 50)}
              </b>
              <div className="mt-2">
                <b>
                  <span className="text-color-second">Category:</span>{" "}
                  {item.category.name}
                </b>
              </div>

              <div className="d-flex justify-content-between text-color-second mt-3">
                <b>
                  <span className="text-color-second">Available Ticket: </span>
                  <span className="text-color">
                    {item.availableTickets}
                  </span>
                </b>
                <b>
                  <span className="text-color-second">Ticket Price: </span>
                  <span className="text-color">
                    &#8377;{item.ticketPrice}
                  </span>
                </b>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;