import { toast } from 'react-toastify';

export const mytoast = {
    success : (msg) => {
        toast.success(msg, {
            position: "top-right",
            autoClose: 1400,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    },
    warn : (msg) => {
        toast.warn(msg, {
            position: "top-right",
            autoClose: 1400,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
}