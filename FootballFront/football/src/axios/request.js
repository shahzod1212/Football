import { toast } from "react-toastify";
import { register } from "./apis";
import { useContext } from "react";
import AppContext from "../context/AppContext";

export async function registerUser(form) {
  const { setUser } = useContext(AppContext);
  try {
    const response = await register(form);

    if (response.status === 201) {
    }
  } catch (err) {
    toast.error(err?.message);
  }
}
