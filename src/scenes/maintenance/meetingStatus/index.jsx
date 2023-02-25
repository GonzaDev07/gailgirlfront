import { Box, Button, Modal, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Alerts from "../../../components/Alert";
import { tokens } from "../../../themes";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Header from "../../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { enviroments } from "../../../env";
import MeetingStatusForm from "./meetingStatusForm";

const MeetingStatus = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [ data, setData ] = useState([]);
    const [ configForm, setConfigForm ] = useState({});
    const [ dataToSend, setDataToSend ] = useState({});
    const [ openModal, setOpen ] = useState(false);

    //Acciones de los botones, nuevo, editar y eliminar
    const CreateMeetingStatusAction = () => {
        setOpen(true);
        setConfigForm({
            title: 'Crear estado de la cita',
            description: 'Formulario para crear estado de cita',
            formType: 1,
            alertMessage: 'Datos creados exitosamente',
            formButtonText: 'CREAR'
        });
        setDataToSend({
            id: 0,
            paymentMethodName: "",
            paymentMethodDescription: "",
            destination: ""
        });
    }

    const UpdateMeetingStatusAction = (item) => {
        setOpen(true);
        setConfigForm({
            title: 'Actualizar estado de la cita',
            description: 'Formulario para actualizar estado de cita',
            formType: 2,
            alertMessage: 'Datos actualizados exitosamente',
            formButtonText: 'ACTUALIZAR'
        });
        setDataToSend(item);
    }

    const DeleteMeetingStatusAction = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        })
        .then((result) => {
            if(result.isConfirmed)
            {
                DeleteMeetingStatusAPI(id);
            }
        })
    }

    //Consumo de apis
    function GetMeetingStatusListAPI(){
        axios.get(enviroments.urlBackend + 'meetingStatus')
        .then((response) => {
            setData(response.data.objModel);
        })
        .catch((error) => {
            Alerts.ErrorAlert({
                title: 'Lo sentimos',
                text: 'No se pudo cargar información de los estados de la cita'
            })
        });
    }

    function DeleteMeetingStatusAPI(id){
        axios.delete(enviroments.urlBackend + 'meetingStatus/' + id)
        .then((response) => {
            Alerts.SuccessAlert({
                title:'Éxito!', 
                text: 'Estado de la cita eliminado satisfactoriamente'
            });
            GetMeetingStatusListAPI();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    //Funciones adicionales
    const handleClose = () => {
        setOpen(false);
        GetMeetingStatusListAPI();
    }

    //Estilos del modal para crear o editar
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

    //useEffect
    useEffect(() => {
        GetMeetingStatusListAPI();
    }, [])

    //Columnas para la tabla
    const columns = [
        {
            field: "id",
            headerName: "ID Estado de la cita",
            flex: 1
        },
        {
            field: "statusName",
            headerName: "Estado de la cita",
            flex: 1
        },
        {
            field: "statusDescription",
            headerName: "Descripción del estado de la cita",
            flex: 1
        },
        {
            field: "actions",
            headerName: "Acciones",
            flex: 1,
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
                            <Button onClick={() => UpdateMeetingStatusAction(row)}>
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
                            <Button onClick={() => DeleteMeetingStatusAction(row.id)}>
                                <DeleteOutlineOutlinedIcon/>
                            </Button>
                        </Box>
                    </Box>
                )
            }
        }
    ]

    return(
        <Box m="20px">
            <Header title="Estado de la cita" subtitle="Crea, edita y elimina tus estados de la cita" />
            <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained" onClick={CreateMeetingStatusAction}>
                    <AddOutlinedIcon />
                    <Typography color="#000000" sx={{ ml: "8px" }}>
                        Nuevo método de pago
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
                <Modal
                  open={openModal}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={modalStyle}>
                    <MeetingStatusForm onClose={handleClose} formConfigAndData={{dataToSend, configForm}}/>
                  </Box>
                </Modal>
            </Box>
        </Box>
    )
}

export default MeetingStatus;