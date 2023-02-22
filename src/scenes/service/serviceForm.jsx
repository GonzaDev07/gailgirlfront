import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
//import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from 'axios';
import { useState } from "react";
import { enviroments } from "../../../src/env";
import Alerts from "../../components/Alert";

const Form = ({onClose, open}) => {

    const SavedService = () => {
        Alerts.SuccessAlert(
            {
                title:'Éxito!', 
                text: 'Datos guardados exitosamente',
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
    const [ serviceName, setServiceName ] = useState("")
    const [ serviceDescription, setServiceDescription ] = useState("")
    const [ servicePrice, setServicePrice ] = useState("")
    const [ serviceEstimatedTime, setServiceEstimatedTime ] = useState("")

    //const isNonMobile = useMediaQuery("min-width:600px")

    const handleFormSubmit = (values) => {
        
        const formData = {
            "serviceName": serviceName,
            "serviceDescription": serviceDescription,
            "servicePrice": parseFloat(servicePrice),
            "serviceEstimatedTime": parseFloat(serviceEstimatedTime)
        }

        axios.post(enviroments.urlBackend + 'service', formData)
        .then((response) => {
            setServiceName("")
            setServiceDescription("")
            setServicePrice("")
            setServiceEstimatedTime("")
            SavedService();
        })
        .catch((error) => {
            ErrorService();
        })

        console.log(formData)
    }

    return (
        <Box m="20px">
            <Header title="Nuevo servicio" subtitle="Crea un nuevo servicio, no te olvides de completar todos los datos." />
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
                                    Crear
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