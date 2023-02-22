import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
//import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import axios from 'axios';
import { useState } from "react";
import { enviroments } from "../../../../src/env";
import Alerts from "../../../components/Alert";


const Form = ({onClose, formTypeAndData}) => {

    console.log(formTypeAndData)

    const [ id, setId ] = useState(formTypeAndData.dataToUpdate.id)
    const [ dni, setDNI ] = useState(formTypeAndData.dataToUpdate.clientDocumentNumber)
    const [ names, setNames ] = useState(formTypeAndData.dataToUpdate.clientName)
    const [ lastnames, setLastnames ] = useState(formTypeAndData.dataToUpdate.clientLastname)
    const [ phone, setPhone ] = useState(formTypeAndData.dataToUpdate.clientPhone)
    const [ address, setAddress ] = useState(formTypeAndData.dataToUpdate.clientAddress)

    const [showButton, setShowButton] = useState(formTypeAndData.titlesForm.searchDNIButton);

    const SavedClient = (text) => {
        Alerts.SuccessAlert(
            {
                title:'Éxito!', 
                text: text,
                textButton:'Aceptar'
            })
        onClose()
    }
    
    const NoSavedClient = (message) => {
        Alerts.ErrorAlert(
            {
                title:'Lo sentimos!', 
                text: message,
                textButton:'Aceptar'
            })
        onClose()
    }

    const NotFoundDocument = (message) => {
        Alerts.WarningAlert(
            {
                title:'Sin datos',
                text: message,
                textButton:'Aceptar'
            });
        setDNI("");
    }

    const ExistingCustomer = (message) => {
        Alerts.WarningAlert(
            {
                title:'Busca bien!',
                text: message,
                textButton:'Aceptar'
            });
        onClose()
    }

    const CreateCient = (formData) => {
        axios.post(enviroments.urlBackend + 'client', formData)
        .then((response) => {
            SavedClient(formTypeAndData.titlesForm.alertMessage);
        })
        .catch((error) => {
            NoSavedClient(error.response.data.description);
        })
    }

    const UpdateClient = (formData) => {
        axios.put(enviroments.urlBackend + 'client', formData)
        .then((response) => {
            SavedClient(formTypeAndData.titlesForm.alertMessage);
        })
        .catch((error) => {
            NoSavedClient(error.response.data.description);
        })
    }

    const handleFormSubmit = (values) => {
        
        const formData = {
            "id": id,
            "clientDocumentNumber": dni,
            "clientName": names,
            "clientLastname": lastnames,
            "clientAddress": address,
            "clientPhone": phone
        }

        formTypeAndData.titlesForm.formType === 1 && CreateCient(formData);
        formTypeAndData.titlesForm.formType === 2 && UpdateClient(formData);
    }

    const consultarDNI = () => {
        axios.get(enviroments.urlBackend + 'client/consultDocument/' + dni,)
        .then((response) => {
            setNames(response.data.objModel.clientName)
            setLastnames(response.data.objModel.clientLastname)
        })
        .catch((error) => {
            const errorMessage = error.response.data.description;
            errorMessage === "El numero de documento no tiene datos" && NotFoundDocument(errorMessage);
            errorMessage === "El cliente ya existe en el sistema" && ExistingCustomer(errorMessage);
        })
    }

    return (
        <Box m="20px">
            <Header title={formTypeAndData.titlesForm.title} subtitle={formTypeAndData.titlesForm.description} />
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    //validationSchema={userSchema}
                >
                    {({ 
                        values, 
                        errors, 
                        touched, 
                        handleBlur, 
                        handleChange, 
                        handleSubmit 
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                m="40px 0 0 0"
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                // sx={{
                                //     "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                // }}
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Numero de Documento"
                                    onBlur={handleBlur}
                                    onChange={(e) => {setDNI(e.target.value)}}
                                    value={dni}
                                    name="clientDocumentNumber"
                                    error={!!touched.clientDocumentNumber && !!errors.clientDocumentNumber}
                                    helperText={touched.clientDocumentNumber && errors.clientDocumentNumber}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                {showButton && (
                                <Box display="flex" justifyContent="start">
                                    <Button onClick={consultarDNI} color="secondary" variant="contained">
                                        CONSULTAR
                                    </Button>
                                </Box>)}
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Nombres"
                                    onBlur={handleBlur}
                                    onChange={(e) => {setNames(e.target.value)}}
                                    value={names}
                                    name="clientName"
                                    error={!!touched.clientName && !!errors.clientName}
                                    helperText={touched.clientName && errors.clientName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Apellidos"
                                    onBlur={handleBlur}
                                    onChange={(e) => {setLastnames(e.target.value)}}
                                    value={lastnames}
                                    name="clientLastname"
                                    error={!!touched.clientLastname && !!errors.clientLastname}
                                    helperText={touched.clientLastname && errors.clientLastname}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Número de teléfono"
                                    onBlur={handleBlur}
                                    onChange={(e) => {setPhone(e.target.value)}}
                                    value={phone}
                                    name="clientPhone"
                                    error={!!touched.clientPhone && !!errors.clientPhone}
                                    helperText={touched.clientPhone && errors.clientPhone}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Dirección"
                                    onBlur={handleBlur}
                                    onChange={(e) => {setAddress(e.target.value)}}
                                    value={address}
                                    name="clientAddress"
                                    error={!!touched.clientAddress && !!errors.clientAddress}
                                    helperText={touched.clientAddress && errors.clientAddress}
                                    sx={{ gridColumn: "span 4" }}
                                />
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    {formTypeAndData.titlesForm.formButtonText}
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
        </Box>
    );
};

const initialValues = {
    clientDocumentNumber: ""
}

// const userSchema = yup.object().shape({
//     clientDocumentNumber: yup.string().required("required")
// })

export default Form;