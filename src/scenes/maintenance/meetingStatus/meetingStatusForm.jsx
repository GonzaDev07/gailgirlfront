import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import Alerts from "../../../components/Alert";
import Header from "../../../components/Header";
import { enviroments } from "../../../env";

const MeetingStatusForm = ({onClose, formConfigAndData}) => {
    console.log(formConfigAndData)

    const receiveData = formConfigAndData.dataToSend;
    const formConfig = formConfigAndData.configForm;

    const [ id ] = useState(receiveData.id);
    const [ statusName, setStatusName ] = useState(receiveData.statusName);
    const [ statusDescription, setStatusDescription ] = useState(receiveData.statusDescription);

    //Consumo de APIS
    const CreateMeetingStatusAPI = (formData) => {
        axios.post(enviroments.urlBackend + 'meetingStatus', formData)
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

    const UpdateMeetingStatusAPI = (formData) => {
        axios.put(enviroments.urlBackend + 'meetingStatus', formData)
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
            "statusName": statusName,
            "statusDescription": statusDescription,
        }

        formConfig.formType === 1 && CreateMeetingStatusAPI(formData);
        formConfig.formType === 2 && UpdateMeetingStatusAPI(formData);
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
                                    label="Estado de la cita"
                                    onBlur={handleBlur}
                                    onChange={(e) => {setStatusName(e.target.value)}}
                                    value={statusName}
                                    name="statusName"
                                    error={!!touched.statusName && !!errors.statusName}
                                    helperText={touched.statusName && errors.statusName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Descripción del estado de la cita"
                                    onBlur={handleBlur}
                                    onChange={(e) => {setStatusDescription(e.target.value)}}
                                    value={statusDescription}
                                    name="statusDescription"
                                    error={!!touched.statusDescription && !!errors.statusDescription}
                                    helperText={touched.statusDescription && errors.statusDescription}
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

export default MeetingStatusForm;