import { FC } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleAlert } from "react-icons/ci";

import styles from "../app/toast.module.css";

import { ToastState } from "@/interface";

const Toast: FC<ToastState> = ({ message, type, isVisible }) => {
  const icon =
    type === "success" ? (
      <CiCircleCheck size={20} color="#10b981" />
    ) : (
      <CiCircleAlert size={20} color="#ef4444" />
    );

  return (
    <div
      className={`${styles.toast} ${
        styles[`toast${type.charAt(0).toUpperCase() + type.slice(1)}`]
      } ${isVisible ? styles.toastVisible : ""}`}
      role="alert"
      aria-live="assertive"
    >
      {icon}
      <span>{message}</span>
    </div>
  );
};

export default Toast;
