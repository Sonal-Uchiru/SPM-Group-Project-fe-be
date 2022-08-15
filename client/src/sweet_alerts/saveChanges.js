import Swal from "sweetalert2";

export const SaveChangesAlert = async () => {
  return await Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  }).then((result) => {
    return result.isConfirmed;
  });
};
