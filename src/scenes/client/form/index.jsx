import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
//import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import axios from 'axios';
import { useState } from "react";
import { enviroments } from "../../../../src/env";
import Alerts from "../../../components/Alert";

const SavedClient = () => {
    Alerts.SuccessAlert(
        {
            title:'Éxito!', 
            text: 'Datos guardados exitosamente',
            textButton:'Aceptar'
        })
}


const Form = () => {

    const [ dni, setDNI ] = useState("")
    const [ names, setNames ] = useState("")
    const [ lastnames, setLastnames ] = useState("")
    const [ phone, setPhone ] = useState("")
    const [ address, setAddress ] = useState("")

    //const isNonMobile = useMediaQuery("min-width:600px")

    const handleFormSubmit = (values) => {
        
        const formData = {
            "clientDocumentNumber": dni,
            "clientName": names,
            "clientLastname": lastnames,
            "clientAddress": address,
            "clientPhone": phone
        }

        axios.post(enviroments.urlBackend + 'client', formData)
        .then((response) => {
            setDNI("")
            setNames("")
            setLastnames("")
            setPhone("")
            setAddress("")
            SavedClient();
        })
        .catch((error) => {
            console.log(error);
        })

        console.log(formData)
    }

    const consultarDNI = () => {
        axios.get(enviroments.urlBackend + 'client/consultDocument/' + dni,)
        .then((response) => {
            setNames(response.data.objModel.clientName)
            setLastnames(response.data.objModel.clientLastname)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <Box m="20px">
            <Header title="Nuevo cliente" subtitle="Consulta el DNI para el llenado automatico de algunos datos y completa los datos que faltan." />
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
                                <Box display="flex" justifyContent="start">
                                    <Button onClick={consultarDNI} color="secondary" variant="contained">
                                        CONSULTAR
                                    </Button>
                                </Box>
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

// const userSchema = yup.object().shape({
//     clientDocumentNumber: yup.string().required("required")
// })

export default Form;