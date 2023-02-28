import { Box, Button, Typography } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Header from '../../components/Header';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { enviroments } from '../../env';
import axios from 'axios';
import Alerts from '../../components/Alert';

const MeetingForm = () => {

    const { state } = useLocation();

    console.log(state);

    const [names, setNames] = useState(state.item.clientName + ' ' + state.item.clientLastname);
    const [date, setDate] = React.useState(dayjs());
    const [collaborator, setCollaborator] = React.useState(1);
    const [meetingStatus, setMeetingStatus] = React.useState(1);
    const [paymentMethod, setPaymentMethod] = React.useState(1);
    const [statusMeetingData, setStatusMeetingData] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);

    const initialValues = {
        id: ""
    }

    async function GetStatusMeetingDataAPI() {
        const req = await fetch(enviroments.urlBackend + "meetingStatus")
        const json = await req.json()
        setStatusMeetingData(json.objModel);
    }

    async function GetCollaboratorsDataAPI() {
        const req = await fetch(enviroments.urlBackend + "collaborator")
        const json = await req.json()
        setCollaborators(json.objModel);
    }

    async function GetPaymentMethodDataAPI() {
        const req = await fetch(enviroments.urlBackend + "paymentMethod")
        const json = await req.json()
        setPaymentMethods(json.objModel);
    }

    const handleChangeCollaborator = (event) => {
        setCollaborator(event.target.value);
        console.log(event);
    };

    const handleChangeMeetingStatus = (event) => {
        setMeetingStatus(event.target.value);
    };

    const handleChangePaymentMethod = (event) => {
        setPaymentMethod(event.target.value);
    };

    const CreateMeetingAPI = (formData) => {
        axios.post(enviroments.urlBackend + 'meeting', formData)
            .then((response) => {
                Alerts.SuccessAlert(
                    {
                        title: 'Éxito!',
                        text: 'Cita agendada correctamente.'
                    }
                )
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

    const handleFormSubmit = () => {
        const meetingData = {
            idClient: state.item.id,
            meetingDate: date.$d,
            idMeetingStatus: meetingStatus,
            idCollaborator: collaborator,
            idPaymentMethod: paymentMethod
        }
        console.log(meetingData);
        CreateMeetingAPI(meetingData);
    }

    useEffect(() => {
        GetStatusMeetingDataAPI();
        GetCollaboratorsDataAPI();
        GetPaymentMethodDataAPI();
    }, [])

    return (
        <Box m="20px">
            <Header title='Programar cita' subtitle='Completa todos los campos necesarios, hay algunos autocompletados' />
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
                            gridTemplateColumns="repeat(1, minmax(0, 1fr))"
                        >
                            <Box>
                                <Typography variant="h3">
                                    Cliente
                                </Typography>
                                <Box
                                    m="10px 0 0 0"
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(1, minmax(0, 1fr))"
                                >
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        disabled="true"
                                        onBlur={handleBlur}
                                        onChange={(e) => { setNames(e.target.value) }}
                                        value={names}
                                        name="names"
                                        error={!!touched.names && !!errors.names}
                                        helperText={touched.names && errors.names}
                                    />
                                </Box>
                            </Box>

                            <Box
                                m="10px 0 0 0"
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Estado de la cita</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={meetingStatus}
                                        label="Estado de la cita"
                                        onChange={handleChangeMeetingStatus}
                                    >
                                        {statusMeetingData.map((item) => (
                                            <MenuItem value={item.id}>{item.statusName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Colaborador</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={collaborator}
                                        label="Colaborador"
                                        onChange={handleChangeCollaborator}
                                    >
                                        {collaborators.map((item) => (
                                            <MenuItem value={item.id}>{item.collaboratorName} {item.collaboratorLastname}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Método de pago</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={paymentMethod}
                                        label="Método de pago"
                                        onChange={handleChangePaymentMethod}
                                    >
                                        {paymentMethods.map((item) => (
                                            <MenuItem value={item.id}>{item.paymentMethodName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="Fecha y hora de la cita"
                                        value={date}
                                        onChange={(newDate) => {
                                            setDate(newDate);
                                        }}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="30px">
                            <Button type="submit" color="secondary" variant="contained">
                                GUARDAR
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}

export default MeetingForm