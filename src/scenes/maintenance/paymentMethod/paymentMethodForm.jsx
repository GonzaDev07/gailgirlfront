import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import Alerts from "../../../components/Alert";
import Header from "../../../components/Header";
import { enviroments } from "../../../env";

const PaymentMethodForm = ({onClose, formConfigAndData}) => {

    console.log(formConfigAndData);

    const receiveData = formConfigAndData.dataToSend;
    const formConfig = formConfigAndData.configForm;

    const [ id ] = useState(receiveData.id);
    const [ paymentMethodName, setPaymentMethodName ] = useState(receiveData.paymentMethodName);
    const [ paymentMethodDescription, setPaymentMethodDescription ] = useState(receiveData.paymentMethodDescription);
    const [ destination, setDestination ] = useState(receiveData.destination);

    //Consumo de APIS
    const CreatePaymentMethodAPI = (formData) => {
        axios.post(enviroments.urlBackend + 'paymentMethod', formData)
        .then((response) => {
            Alerts.SuccessAlert(
                {
                    title:'Éxito!',
                    text: formConfig.alertMessage 
                }
            )
            onClose()
        })
        .catch((error) => {
            Alerts.ErrorAlert(
                {
                    title:'Lo sentimos!',
                    text: error.response.data.description
                }
            )
        });
    }

    const UpdatePaymentMethodAPI = (formData) => {
        axios.put(enviroments.urlBackend + 'paymentMethod', formData)
        .then((response) => {
            Alerts.SuccessAlert(
                {
                    title:'Éxito!',
                    text: formConfig.alertMessage 
                }
            )
            onClose();
        })
        .catch((error) => {
            Alerts.ErrorAlert(
                {
                    title:'Lo sentimos!',
                    text: error.response.data.description
                }
            )
        });
    }

    //Otras funciones
    const handleFormSubmit = () => {
        
        const formData = {
            "id": id,
            "paymentMethodName": paymentMethodName,
            "paymentMethodDescription": paymentMethodDescription,
            "destination": destination
        }

        console.log(formConfig);

        formConfig.formType === 1 && CreatePaymentMethodAPI(formData);
        formConfig.formType === 2 && UpdatePaymentMethodAPI(formData);
    }

    const initialValues = {
        id: ""
    }

    return (
        <Box>
            <Header title={formConfig.title} subtitle={formConfig.description} />
            <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
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
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Método de pago"
                                    onBlur={handleBlur}
                                    onChange={(e) => {setPaymentMethodName(e.target.value)}}
                                    value={paymentMethodName}
                                    name="paymentMethodName"
                                    error={!!touched.paymentMethodName && !!errors.paymentMethodName}
                                    helperText={touched.paymentMethodName && errors.paymentMethodName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Descripción del método de pago"
                                    onBlur={handleBlur}
                                    onChange={(e) => {setPaymentMethodDescription(e.target.value)}}
                                    value={paymentMethodDescription}
                                    name="paymentMethodDescription"
                                    error={!!touched.paymentMethodDescription && !!errors.paymentMethodDescription}
                                    helperText={touched.paymentMethodDescription && errors.paymentMethodDescription}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Destino (NUMERO O CUENTA)"
                                    onBlur={handleBlur}
                                    onChange={(e) => {setDestination(e.target.value)}}
                                    value={destination}
                                    name="destination"
                                    error={!!touched.destination && !!errors.destination}
                                    helperText={touched.destination && errors.destination}
                                    sx={{ gridColumn: "span 2" }}
                                />
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    {formConfig.formButtonText}
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
        </Box>
    )
}

export default PaymentMethodForm;