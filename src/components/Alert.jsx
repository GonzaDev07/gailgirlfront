import Swal from 'sweetalert2';

const SuccessAlert = ({title, text, textButton}) => {
    Swal.fire({
        icon: 'success',
        title: title,
        text: text,
        button: textButton
    });
}

const ErrorAlert = ({title, text, textButton}) => {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        button: textButton
    });
}

const WarningAlert = ({title, text, textButton}) => {
    Swal.fire({
        icon: 'warning',
        title: title,
        text: text,
        button: textButton
    });
}

const InfoAlert = ({title, text, textButton}) => {
    Swal.fire({
        icon: 'info',
        title: title,
        text: text,
        button: textButton
    });
}

const ErrorAlertWhatsApp = ({title, text}) => {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        footer: '<a href="">Error desconocido? Reportalo a nuestro WhatsApp</a>'
      })
}

const Alerts = {
    SuccessAlert,
    ErrorAlert,
    WarningAlert,
    InfoAlert,
    ErrorAlertWhatsApp
}

export default Alerts;
