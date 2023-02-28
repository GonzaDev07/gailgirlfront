import { Box, Button, useTheme, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../themes";
import { enviroments } from "../../env";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import React from 'react';
import Modal from '@mui/material/Modal';
import Form from "../client/form/index";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const Client = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [data, setData] = useState([])
    const [titlesForm, setTitlesForm] = useState({})
    const [dataToUpdate, setDataToUpdate] = useState({});

    const navigate = useNavigate();

    async function getData() {
        const req = await fetch(enviroments.urlBackend + "client")
        const json = await req.json()
        setData(json.objModel)
        Swal.close();
    }

    const EditClient = (item) => {
        setOpen(true);
        setDataToUpdate(item)
        setTitlesForm({
            title: 'Editar cliente',
            description: 'Formulario para editar al cliente',
            formType: 2,
            formTypeDescription: 'Form to update',
            alertMessage: 'Datos actualizados exitosamente',
            formButtonText: 'ACTUALIZAR',
            searchDNIButton: false
        })
    }

    const OpenMeetingForm = (item) => {
        navigate('/meetingForm', { state: { item } });
    }

    const CreateClient = () => {
        setOpen(true);
        setDataToUpdate({
            "id": 0,
            "clientDocumentNumber": "",
            "clientName": "",
            "clientLastname": "",
            "clientAddress": "",
            "clientPhone": ""
        })
        setTitlesForm({
            title: 'Nuevo cliente',
            description: 'Consulta el DNI para el llenado automatico de algunos datos y completa los datos que faltan',
            formType: 1,
            formTypeDescription: 'Form to create',
            alertMessage: 'Datos guardados existosamente',
            formButtonText: 'CREAR',
            searchDNIButton: true
        })
    }

    useEffect(() => {
        Swal.fire({
            title: 'Cargando datos',
            text: 'Por favor espere...',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        getData();
    }, [])

    const columns = [
        {
            field: "id",
            headerName: "ID Cliente"
        },
        {
            field: "clientDocumentNumber",
            headerName: "Numero Documento",
            flex: 1
        },
        {
            field: "clientName",
            headerName: "Nombres",
            flex: 1
        },
        {
            field: "clientLastname",
            headerName: "Apellidos",
            flex: 1
        },
        {
            field: "clientAddress",
            headerName: "Dirección",
            flex: 1
        },
        {
            field: "clientPhone",
            headerName: "Telefono",
            flex: 1
        },
        {
            field: "actions",
            headerName: "Acciones",
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(3, minmax(0, 1fr))">
                        <Box
                            width="60%"
                            m="0 "
                            p="1px"
                            display="flex"
                            justifyContent="center"
                            backgroundColor={
                                colors.greenAccent[600]
                            }
                            borderRadius="4px"
                        >
                            <Button onClick={() => EditClient(row)}>
                                <EditOutlinedIcon />
                            </Button>
                        </Box>
                        {/* <Box
                            width="60%"
                            m="0"
                            p="1px"
                            display="flex"
                            justifyContent="center"
                            backgroundColor={
                                colors.redAccent[400]
                            }
                            borderRadius="4px"
                        >
                            <Button>
                                <PersonOffOutlinedIcon />
                            </Button>
                        </Box> */}
                        <Box
                            width="60%"
                            m="0"
                            p="1px"
                            display="flex"
                            justifyContent="center"
                            backgroundColor={
                                colors.blueAccent[400]
                            }
                            borderRadius="4px"
                        >
                            <Button onClick={() => OpenMeetingForm(row)}>
                                <CalendarMonthOutlinedIcon />
                            </Button>
                        </Box>
                    </Box>
                )
            }
        }
    ]

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: colors.blueAccent[900],
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: '20px',
        p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
        getData();
    }

    return (
        <Box m="20px">
            <Header title="Clientes" subtitle="Crea, edita y elimina a tus clientes" />
            <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained" onClick={CreateClient}>
                    <PersonAddOutlinedIcon />
                    <Typography color="#000000" sx={{ ml: "8px" }}>
                        Nuevo cliente
                    </Typography>
                </Button>
            </Box>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300]
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColo: colors.primary[400]
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700]
                    }
                }}
            >
                <DataGrid rows={data} columns={columns} />
            </Box>

            <Box m="20px">
                {/* <Button variant="contained" onClick={handleOpen}>Open modal</Button> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Form onClose={handleClose} formTypeAndData={{ dataToUpdate, titlesForm }} />
                    </Box>
                </Modal>
            </Box>
        </Box>
    )
}

export default Client;