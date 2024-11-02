import axios from "axios"
import { toast } from "react-toastify";



export const api = axios.create({
	baseURL: "http://localhost:9192"
})

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

export async function createAdmin(registerRequest) {
    try {
      const response = await api.post("/user/admin/register", registerRequest);
      return response.data;
    } catch (error) {
      toast.error("It seems server is down", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      throw new Error("Error creating admin");
    }
}



export async function login(loginRequest){
  try{
    const response = await api.post("/user/login",loginRequest);
    return response.data;
  }
  catch(error){
    throw new error("error during login"); 
  }
}








//   export async function createEvent(eventRequest) {
//     try {
//       const response = await api.post("/event/create", eventRequest);
//       return response.data;
//     } catch (error) {
//       toast.error("It seems server is down", {
//         position: "top-center",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//   })}
// }



export async function getAllCategories(){
  try{
    const response =await api.get("/event/category")
    return response.data;
  }
  catch(error){
    throw new error("error during getting categories");
  }
}



export async function getAllEvents(){
try{
  const response = await api.get("/event/all");
  return response.data;
}
catch(error){
  throw new error("error during getting events");
}
}



export async function searchEvents(eventName , eventCategoryId){
  if (eventName !== "") {
    const response = await api.get(
      "http://localhost:8080/api/event/fetch/name-wise?eventName=" + eventName
    );

    return response.data;
  } 

  else if (eventCategoryId !== "" || eventCategoryId !== "0") {
    const response = await api.get(
      "http://localhost:8080/api/event/fetch/category-wise?categoryId=" +
        eventCategoryId
    );
    return response.data;
  }
};






export async function findByEvent(){
try{
  const response= await api.get("/event/findbyevent")
  return response.data
}
catch(error){
  throw new error("error during finding events");
}
}



export async function getEventByCategory(){
  try{
  const response = await api.get("/event/category")
  return response.data;
  }

  
  catch(error){
    throw new error("error during getting events by category");
  }
}




