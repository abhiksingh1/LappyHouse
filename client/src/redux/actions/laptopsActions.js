import { message } from "antd";
import axios from "axios";

export const getAllLaptops = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/api/laptops/getalllaptops");
    dispatch({ type: "GET_ALL_LAPTOPS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const addLaptop = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  
  try {
    await axios.post("/api/laptops/addlaptop", reqObj);
    dispatch({ type: "LOADING", payload: false });
    message.success("New laptop added successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editLaptop = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/laptops/editlaptop", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("Laptop details updated successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deleteLaptop = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/laptops/deletelaptop", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("Laptop deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
