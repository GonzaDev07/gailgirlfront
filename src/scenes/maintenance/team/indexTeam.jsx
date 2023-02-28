import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Alerts from "../../../components/Alert";
import Header from "../../../components/Header";
import { enviroments } from "../../../env";
import { tokens } from "../../../themes";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Modal from '@mui/material/Modal';
import CollaboratorForm from "../team/teamForm";

const Team = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [data, setData] = useState([]);
    const [configForm, setConfigForm] = useState({});
    const [dataToSend, setDataToSend] = useState({});
    const [openModal, setOpen] = useState(false);

    //Acciones de los botones, nuevo, editar y eliminar
    const CreateCollaboratorAction = () => {
        setOpen(true);
        setConfigForm({
            title: 'Crear colaborador',
            description: 'Formulario para crear colaborador',
            formType: 1,
            alertMessage: 'Datos creados exitosamente',
            formButtonText: 'CREAR'
        });
        setDataToSend({
            id: 0,
            collaboratorName: "",
            collaboratorLastname: ""
        });
    }

    const UpdateCollaboratorAction = (item) => {
        setOpen(true);
        setConfigForm({
            title: 'Actualizar colaborador',
            description: 'Formulario para actualizar colaborador',
            formType: 2,
            alertMessage: 'Datos actualizados exitosamente',
            formButtonText: 'ACTUALIZAR'
        });
        setDataToSend(item);
    }

    const DeleteCollaboratorAction = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    DeleteCollaboratorAPI(id);
                }
            })
    }

    //Consumo de apis
    function GetCollaboratorAPI() {
        axios.get(enviroments.urlBackend + 'collaborator')
            .then((response) => {
                setData(response.data.objModel);
            })
            .catch((error) => {
                Alerts.ErrorAlert({
                    title: 'Lo sentimos',
                    text: 'No se pudo cargar información de tus colaboradores'
                })
            });
    }

    function DeleteCollaboratorAPI(id) {
        axios.delete(enviroments.urlBackend + 'collaborator/' + id)
            .then((response) => {
                Alerts.SuccessAlert({
                    title: 'Éxito!',
                    text: 'Colaborador eliminado satisfactoriamente'
                });
                GetCollaboratorAPI();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //Funciones adicionales
    const handleClose = () => {
        setOpen(false);
        GetCollaboratorAPI();
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
        borderRadius: '20px'
    };

    //useEffect
    useEffect(() => {
        GetCollaboratorAPI();
    }, [])

    //Columnas para la tabla
    const columns = [
        {
            field: "id",
            headerName: "ID Colaborador"
        },
        {
            field: "collaboratorName",
            headerName: "Nombres del colaborador",
            flex: 1
        },
        {
            field: "collaboratorLastname",
            headerName: "Apellidos del colaborador",
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
                            <Button onClick={() => UpdateCollaboratorAction(row)}>
                                <EditOutlinedIcon />
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
                            <Button onClick={() => DeleteCollaboratorAction(row.id)}>
                                <DeleteOutlineOutlinedIcon />
                            </Button>
                        </Box>
                    </Box>
                )
            }
        }
    ]

    return (
        <Box m="20px">
            <Header title="Colaboradores" subtitle="Crea, edita y elimina a tus colaboradores" />
            <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained" onClick={CreateCollaboratorAction}>
                    <AddOutlinedIcon />
                    <Typography color="#000000" sx={{ ml: "8px" }}>
                        Nuevo colaborador
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
                        <CollaboratorForm onClose={handleClose} formConfigAndData={{ dataToSend, configForm }} />
                    </Box>
                </Modal>
            </Box>
        </Box>
    )
}

export default Team;