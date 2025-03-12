import React from "react";
import { toast } from "react-toastify";

const ToastMessage = ({ type, message }) => {
  toast.dismiss()
  toast[type](
    <div style={{ display: "flex" }}>
      <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>
        {message}
      </div>
    </div>,
    {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      limit: 1,
    }
  );

  ToastMessage.dismiss = toast.dismiss;
  toast.clearWaitingQueue();

}

export default ToastMessage;
