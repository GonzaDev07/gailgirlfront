import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
//import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from 'axios';
import { useState } from "react";
import { enviroments } from "../../../src/env";
import Alerts from "../../components/Alert";

const Form = ({onClose, formTypeAndData}) => {

    console.log(formTypeAndData);

    const receivedData = formTypeAndData.dataToSend;
    const formAttributes = formTypeAndData.titlesForm;

    const [ id ] = useState(receivedData.id)
    const [ serviceName, setServiceName ] = useState(receivedData.serviceName)
    const [ serviceDescription, setServiceDescription ] = useState(receivedData.serviceDescription)
    const [ servicePrice, setServicePrice ] = useState(receivedData.servicePrice)
    const [ serviceEstimatedTime, setServiceEstimatedTime ] = useState(receivedData.serviceEstimatedTime)

    const SavedService = (message) => {
        Alerts.SuccessAlert(
            {
                title:'Éxito!', 
                text: message,
                textButton:'Aceptar'
            })
        onClose();
    }
    
    const ErrorService = () => {
        Alerts.ErrorAlert(
            {
                title:'Éxito!', 
                text: 'Datos guardados exitosamente',
                textButton:'Aceptar'
            })
    }

    const CreateService = (formData) => {
        axios.post(enviroments.urlBackend + 'service', formData)
        .then((response) => {
            SavedService(formAttributes.alertMessage);
        })
        .catch((error) => {
            ErrorService(error.response.data.description);
        })
    }

    const UpdateService = (formData) => {
        axios.put(enviroments.urlBackend + 'service', formData)
        .then((response) => {
            SavedService(formAttributes.alertMessage);
        })
        .catch((error) => {
            ErrorService(error.response.data.description);
        })
    }

    const handleFormSubmit = (values) => {
        
        const formData = {
            "id": id,
            "serviceName": serviceName,
            "serviceDescription": serviceDescription,
            "servicePrice": parseFloat(servicePrice),
            "serviceEstimatedTime": parseFloat(serviceEstimatedTime)
        }

        formAttributes.formType === 1 && CreateService(formData);
        formAttributes.formType === 2 && UpdateService(formData);
    }

    return (
        <Box m="20px">
            <Header title={formAttributes.title} subtitle={formAttributes.description} />
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
                                    label="Numero de Nombre del servicio"
                                    onBlur={handleBlur}
                                    onChange={(e) => {setServiceName(e.target.value)}}
                                    value={serviceName}
                                    name="serviceName"
                                    error={!!touched.clientDocumentNumber && !!errors.clientDocumentNumber}
                                    helperText={touched.clientDocumentNumber && errors.clientDocumentNumber}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Descripción del servicio"
                                    onBlur={handleBlur}
                                    onChange={(e) => {setServiceDescription(e.target.value)}}
                                    value={serviceDescription}
                                    name="serviceDescription"
                                    error={!!touched.clientName && !!errors.clientName}
                                    helperText={touched.clientName && errors.clientName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Precio (Soles)"
                                    onBlur={handleBlur}
                                    onChange={(e) => {setServicePrice(e.target.value)}}
                                    value={servicePrice}
                                    name="servicePrice"
                                    error={!!touched.clientLastname && !!errors.clientLastname}
                                    helperText={touched.clientLastname && errors.clientLastname}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Tiempo estimado (en minutos)"
                                    onBlur={handleBlur}
                                    onChange={(e) => {setServiceEstimatedTime(e.target.value)}}
                                    value={serviceEstimatedTime}
                                    name="serviceEstimatedTime"
                                    error={!!touched.clientPhone && !!errors.clientPhone}
                                    helperText={touched.clientPhone && errors.clientPhone}
                                    sx={{ gridColumn: "span 2" }}
                                />
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    {formAttributes.formButtonText}
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

export default Form;