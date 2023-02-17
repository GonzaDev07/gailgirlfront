import Swal from 'sweetalert';

const SuccessAlert = ({title, text, textButton}) => {
    Swal({
        icon: 'success',
        title: title,
        text: text,
        button: textButton
    });
}

const ErrorAlert = ({title, text, textButton}) => {
    Swal({
        icon: 'error',
        title: title,
        text: text,
        button: textButton
    });
}

const WarningAlert = ({title, text, textButton}) => {
    Swal({
        icon: 'warning',
        title: title,
        text: text,
        button: textButton
    });
}

const InfoAlert = ({title, text, textButton}) => {
    Swal({
        icon: 'info',
        title: title,
        text: text,
        button: textButton
    });
}

const Alerts = {
    SuccessAlert,
    ErrorAlert,
    WarningAlert,
    InfoAlert
}

export default Alerts;