import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import Alerts from "../../../components/Alert";
import Header from "../../../components/Header";
import { enviroments } from "../../../env";

const CollaboratorForm = ({ onClose, formConfigAndData }) => {

    const receiveData = formConfigAndData.dataToSend;
    const formConfig = formConfigAndData.configForm;

    const [id] = useState(receiveData.id);
    const [collaboratorName, setCollaboratorName] = useState(receiveData.collaboratorName);
    const [collaboratorLastname, setCollaboratorLastname] = useState(receiveData.collaboratorLastname);

    //Consumo de APIS
    const CreateCollaboratorAPI = (formData) => {
        axios.post(enviroments.urlBackend + 'collaborator', formData)
            .then((response) => {
                Alerts.SuccessAlert(
                    {
                        title: 'Éxito!',
                        text: formConfig.alertMessage
                    }
                )
                onClose()
            })
            .catch((error) => {
                Alerts.ErrorAlert(
                    {
                        title: 'Lo sentimos!',
                        text: error.response.data.description
                    }
                )
            });
    }

    const UpdateCollaboratorAPI = (formData) => {
        axios.put(enviroments.urlBackend + 'collaborator', formData)
            .then((response) => {
                Alerts.SuccessAlert(
                    {
                        title: 'Éxito!',
                        text: formConfig.alertMessage
                    }
                )
                onClose();
            })
            .catch((error) => {
                Alerts.ErrorAlert(
                    {
                        title: 'Lo sentimos!',
                        text: error.response.data.description
                    }
                )
            });
    }

    //Otras funciones
    const handleFormSubmit = () => {

        const formData = {
            "id": id,
            "collaboratorName": collaboratorName,
            "collaboratorLastname": collaboratorLastname
        }

        formConfig.formType === 1 && CreateCollaboratorAPI(formData);
        formConfig.formType === 2 && UpdateCollaboratorAPI(formData);
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
                                label="Nombre"
                                onBlur={handleBlur}
                                onChange={(e) => { setCollaboratorName(e.target.value) }}
                                value={collaboratorName}
                                name="collaboratorName"
                                error={!!touched.collaboratorName && !!errors.collaboratorName}
                                helperText={touched.collaboratorName && errors.collaboratorName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Apellidos"
                                onBlur={handleBlur}
                                onChange={(e) => { setCollaboratorLastname(e.target.value) }}
                                value={collaboratorLastname}
                                name="collaboratorLastname"
                                error={!!touched.collaboratorLastname && !!errors.collaboratorLastname}
                                helperText={touched.collaboratorLastname && errors.collaboratorLastname}
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

export default CollaboratorForm;