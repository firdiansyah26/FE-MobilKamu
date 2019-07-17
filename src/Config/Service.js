import axios from 'axios';
import swals from 'sweetalert2'

export function GET(url, header) {
    return axios.get(url, header)
        .then((res) => {
            if (res.status == 200) {
                return res.data
            }
            else if (res.status == 401) {
                return res.data
            }
            else {
                return res.data
            }
        })
        .catch((err) => {
            if (err.response.status == 401) {
                swals.fire({
                    title: 'Info',
                    text: err.response.statusText,
                    type: 'info',
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya',
                }).then(function (confirm) {
                    // actionLogout()
                })
            }
            else if (err.response == undefined) {
                swals.fire({
                    title: 'Info',
                    text: err.stack,
                    type: 'info',
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya',
                }).then(function (confirm) {
                    // actionLogout()
                })
            }
            else {
                swals.fire({
                    title: 'Info',
                    text: err.response.data.message,
                    type: 'info',
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya',
                }).then(function (confirm) {
                    // actionLogout()
                })
            }
            return err.response.data
        })
}
