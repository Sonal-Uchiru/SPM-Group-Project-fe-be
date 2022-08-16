import Swal from "sweetalert2";

export const ErrorAlert = async (text) => {
  await Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
    timer: 1500,
  });
};
