import { toast } from 'react-toastify';
import { css } from "glamor";

export const mytoast = {
    success : (msg) => {
        toast.success(msg, {
            position: "bottom-right",
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,

            bodyClassName: css({
                textAlign:'center',
                fontWeight: 'bold',
                color: 'black'
              }),
        });
    },
    warn : (msg, options = {}) => {
        toast.warn(msg, {
            ...options,
            position: "bottom-right",
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,

            bodyClassName: css({
                textAlign:'center',
                fontWeight: 'bold',
                color: 'black'
              }),
        });
    }
}