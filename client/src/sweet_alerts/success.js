import Swal from "sweetalert2";

export const SuccessAlert = async (text) => {
  await Swal.fire({
    position: "center",
    icon: "success",
    title: text,
    showConfirmButton: false,
    timer: 1500,
  });
};
