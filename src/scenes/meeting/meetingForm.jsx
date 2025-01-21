import { Box, Button, Typography, useTheme } from '@mui/material';
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
import { tokens } from '../../themes';
import { DataGrid } from "@mui/x-data-grid";
import Checkbox from '@mui/material/Checkbox';

const MeetingForm = () => {

    const { state } = useLocation();


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [names, setNames] = useState(state.item.clientName + ' ' + state.item.clientLastname);
    const [date, setDate] = React.useState(dayjs());
    const [collaborator, setCollaborator] = React.useState(1);
    const [meetingStatus, setMeetingStatus] = React.useState(1);
    const [paymentMethod, setPaymentMethod] = React.useState(1);
    const [statusMeetingData, setStatusMeetingData] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);

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

    async function GetServicesDataAPI() {
        const req = await fetch(enviroments.urlBackend + "service")
        const json = await req.json()
        setServices(json.objModel);
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

    const handleCheckboxChange = (service) => {
        setSelectedServices((prev) => {
            if (prev.some((s) => s.id === service.id)) {
                // Si ya está seleccionado, lo removemos
                return prev.filter((s) => s.id !== service.id);
            }
            // Si no está seleccionado, lo añadimos
            return [...prev, service];
        });
    };

    const CreateMeetingAPI = (formData) => {

        console.log(formData)
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
        GetServicesDataAPI();
    }, [])

    const totalPrice = selectedServices.reduce((acc, service) => acc + service.servicePrice, 0);

    const columns = [
        {
            field: "id",
            headerName: "ID Servicio"
        },
        {
            field: "serviceName",
            headerName: "Servicio",
            flex: 1
        },
        {
            field: "servicePrice",
            headerName: "Precio",
            flex: 1,
            renderCell: ({ row: { servicePrice } }) => {
                return (
                    <Typography>
                        S/ {servicePrice}
                    </Typography>
                )
            }
        },
        {
            field: "serviceEstimatedTime",
            headerName: "Tiempo",
            flex: 1,
            renderCell: ({ row: { serviceEstimatedTime } }) => {
                return (
                    <Typography>
                        {serviceEstimatedTime} minutos
                    </Typography>
                )
            }
        },
        {
            field: "select",
            headerName: "Seleccionar",
            flex: 1,
            renderCell: ({ row }) => (
                <Checkbox
                    checked={selectedServices.some((s) => s.id === row.id)}
                    onChange={() => handleCheckboxChange(row)}
                />
            ),
        },
    ]

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
                            <Box
                                m="10px 0 0 0"
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                alignItems="center" // Centrar contenido verticalmente
                            >
                                {/* Tabla de servicios */}
                                <Box
                                    height="30vh"
                                    sx={{
                                        gridColumn: "span 2", // Ocupar las primeras dos columnas
                                        "& .MuiDataGrid-root": {
                                            border: "none",
                                        },
                                        "& .MuiDataGrid-cell": {
                                            borderBottom: "none",
                                        },
                                        "& .name-column--cell": {
                                            color: colors.greenAccent[300],
                                        },
                                        "& .MuiDataGrid-columnHeaders": {
                                            backgroundColor: colors.blueAccent[700],
                                            borderBottom: "none",
                                        },
                                        "& .MuiDataGrid-virtualScroller": {
                                            backgroundColor: colors.primary[400],
                                        },
                                        "& .MuiDataGrid-footerContainer": {
                                            borderTop: "none",
                                            backgroundColor: colors.blueAccent[700],
                                        },
                                    }}
                                >
                                    <DataGrid rows={services} columns={columns} />
                                </Box>

                                {/* Resumen de servicios */}
                                <Box
                                    p="20px"
                                    border={`1px solid ${colors.grey[300]}`} // Borde gris claro del tema
                                    borderRadius="8px"
                                    bgcolor={colors.primary[400]} // Fondo acorde al tema
                                    boxShadow={`0px 2px 6px ${colors.grey[500]}`} // Sombra ligera del tema
                                    sx={{
                                        gridColumn: "span 2", // Ocupar las últimas dos columnas
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center", // Centrar verticalmente el contenido
                                    }}
                                >
                                    <Typography
                                        variant="h3"
                                        gutterBottom
                                        fontWeight="bold"
                                        sx={{ color: colors.grey[300], mb: 2 }}
                                    >
                                        Resumen de servicios
                                    </Typography>
                                    <Box>
                                        {selectedServices.map((service) => (
                                            <Box
                                                key={service.id}
                                                display="flex"
                                                justifyContent="space-between"
                                                sx={{
                                                    mb: 1,
                                                    borderBottom: `1px dashed ${colors.grey[300]}`,
                                                    pb: 1,
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    sx={{ color: colors.grey[100] }}
                                                >
                                                    {service.serviceName}
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    fontWeight="bold"
                                                    sx={{ color: colors.greenAccent[300] }}
                                                >
                                                    S/ {service.servicePrice}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        mt={3}
                                        pt={2}
                                        borderTop={`1px solid ${colors.primary[300]}`} // Separador para el total
                                    >
                                        <Typography
                                            variant="h3"
                                            fontWeight="bold"
                                            sx={{ color: colors.grey[500] }}
                                        >
                                            Total
                                        </Typography>
                                        <Typography
                                            variant="h2"
                                            fontWeight="bold"
                                            sx={{ color: colors.greenAccent[500] }}
                                        >
                                            S/ {totalPrice}
                                        </Typography>
                                    </Box>
                                </Box>
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