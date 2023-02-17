import { Box, Button, useTheme, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../themes";
import { enviroments } from "../../env";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Swal from 'sweetalert';

const Client = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [data, setData] = useState([])

    async function getData(){
        const req = await fetch(enviroments.urlBackend + "client")
        const json = await req.json()
        setData(json.objModel)
    }
    
    function gola(){
        Swal({
            title: 'Hello!',
            text: 'This is a SweetAlert popup.',
            icon: 'success',
            button: 'Aceptar'
        });
    }

    useEffect(() => { 
        getData();
    }, [] ) 

    const columns = [
        { 
            field: "id", 
            headerName: "ID Cliente"},
        {
            field: "clientDocumentNumber",
            headerName: "Numero Documento",
            flex:1
        },
        {
            field: "clientName",
            headerName: "Nombres",
            flex:1
        },
        {
            field: "clientLastname",
            headerName: "Apellidos",
            flex:1
        },
        {
            field: "clientAddress",
            headerName: "Dirección",
            flex:1
        },
        {
            field: "clientPhone",
            headerName: "Telefono",
            flex:1
        },
        {
            field: "actions",
            headerName: "Acciones",
            flex:1,
            renderCell: () => {
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
                            <Button>
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
                            <Button onClick={gola}>
                                <DeleteOutlineOutlinedIcon/>
                            </Button>
                        </Box>
                    </Box>
                )
            }
        }
    ]

    return (
        <Box m="20px">
            <Header title="Clientes" subtitle="Crea, edita y elimina a tus clientes" />
            <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
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
        </Box>
    )
}

export default Client;