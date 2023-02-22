import { Box, Button, useTheme, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../themes";
import { enviroments } from "../../env";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import React from 'react';
import Modal from '@mui/material/Modal';
import ServiceForm from "./serviceForm";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Swal from 'sweetalert2';
import axios from 'axios';
import Alerts from "../../../src/components/Alert";


const Service = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([])
    const [titlesForm, setTitlesForm] = useState({})
    const [ dataToSend, setDataToSend ] = useState({});

    const DeletedService = () => {
        Alerts.SuccessAlert(
            {
                title:'Éxito!', 
                text: 'Servicio eliminado satisfactoriamente',
                textButton:'Aceptar'
            })
    }

    const CreateService = () => {
        setOpen(true);
        setDataToSend({
            "id": 0,
            "serviceName": "",
            "serviceDescription": "",
            "servicePrice": "",
            "serviceEstimatedTime": ""
        });
        setTitlesForm({
            title: 'Cerar servicio',
            description: 'Formulario para crear servicio',
            formType: 1,
            formTypeDescription: 'Form to cerate',
            alertMessage: 'Datos creados exitosamente',
            formButtonText: 'CREAR'
        })
    }
    
    const EditService = (item) => {
        setOpen(true);
        setDataToSend(item);
        setTitlesForm({
            title: 'Editar servicio',
            description: 'Formulario para editar servicio',
            formType: 2,
            formTypeDescription: 'Form to update',
            alertMessage: 'Datos actualizados exitosamente',
            formButtonText: 'ACTUALIZAR'
        })
    }
    
    const DeleteService = (id) => {

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(enviroments.urlBackend + 'service/' + id)
                        .then((response) => {
                            DeletedService()
                            getData()
                        })
                        .catch((error) => {
                        })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              // Acción cuando se hace clic en el botón "Cancelar" o se hace clic fuera de la alerta
            }
          })
          
    }

    async function getData(){
        const req = await fetch(enviroments.urlBackend + "service")
        const json = await req.json()
        setData(json.objModel)
    }

    useEffect(() => { 
        getData();
    }, [] )

    const columns = [
        { 
            field: "id", 
            headerName: "ID Servicio"},
        {
            field: "serviceName",
            headerName: "Servicio",
            flex:1
        },
        {
            field: "serviceDescription",
            headerName: "Descripción del servicio",
            flex:1
        },
        {
            field: "servicePrice",
            headerName: "Precio (En soles)",
            flex:1,
            renderCell: ({ row: {servicePrice} }) => {
                return (
                    <Typography>
                        S/ {servicePrice}
                    </Typography>
                )
            }
        },
        {
            field: "serviceEstimatedTime",
            headerName: "Tiempo estimado (Minutos)",
            flex:1,
            renderCell: ({ row: {serviceEstimatedTime} }) => {
                return (
                    <Typography>
                        {serviceEstimatedTime} minutos
                    </Typography>
                )
            }
        },
        {
            field: "actions",
            headerName: "Acciones",
            flex:1,
            renderCell: ({row}) => {
                return (
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(2, minmax(0, 1fr))">
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
                            <Button onClick={() => EditService(row)}>
                                <EditOutlinedIcon/>
                            </Button>
                        </Box>
                        <Box
                            width="60%"
                            m="0"
                            p="1px"
                            display="flex"
                            justifyContent="center"
                            backgroundColor={
                                colors.redAccent[600]
                                }
                            borderRadius="4px"
                        >
                            <Button onClick={() => DeleteService(row.id)}>
                                <DeleteOutlineOutlinedIcon/>
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
        p: 4,
        borderRadius:'20px'
    };
    
        const [open, setOpen] = React.useState(false);
        const handleClose = () => {
            setOpen(false);
            getData();
        }


    return (
        <Box m="20px">
            <Header title="Servicios" subtitle="Crea, edita y elimina tus servicios" />
            <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained" onClick={CreateService}>
                    <AddOutlinedIcon />
                    <Typography color="#000000" sx={{ ml: "8px" }}>
                        Nuevo servicio
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
                    <ServiceForm onClose={handleClose} formTypeAndData={{dataToSend, titlesForm}}/>
                  </Box>
                </Modal>
            </Box>
        </Box>
    )
}

export default Service;