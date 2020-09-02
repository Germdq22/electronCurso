import { toast } from "react-toastify";

export default function alertErrors(type) {
  switch (type) {
    case "auth/wrong-password":
      toast.warning("La contraseña introducida no es correcta.");
      break;

    case "auth/email-already-in-use":
      toast.warning("el nuevo email esta en uso.");
      break;

    default:
      toast.warning("Error del servidor, inténtelo más tarde.");
      break;
  }
}
