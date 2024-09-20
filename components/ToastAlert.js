import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const ToastAlert = React.memo(function ToastAlert() {
  return (
    <ToastContainer
      position="top-center"
      hideProgressBar={true}
      autoClose={5000}
      closeOnClick
      draggable={false}
    />
  );
});

export default ToastAlert;
