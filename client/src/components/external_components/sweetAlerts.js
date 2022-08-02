import Swal from "sweetalert2";

export default async function showAlerts(type, text) {
    // type 1 = success, type 2 = error, type 3 = update success
    if (type === 1) {
        await Swal.fire({
            position: "center",
            icon: "success",
            title: text,
            showConfirmButton: false,
            timer: 1500,
        });
    } else if (type === 2) {
        await Swal.fire({
            icon: "error",
            title: "Oops...",
            text: text,
        });
    }
}
