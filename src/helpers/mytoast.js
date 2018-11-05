import { toast } from 'react-toastify';

export const mytoast = {
    success : (msg) => {
        toast.success(msg, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
}