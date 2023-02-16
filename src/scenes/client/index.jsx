import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../themes";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Header from "../../components/Header";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { useEffect, useState } from "react";
import { json } from "react-router-dom";

const Client = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [data, setData] = useState([])

    async function getData(){
        const req = await fetch("https://backendgailgir.azurewebsites.net/api/client")
        const json = await req.json()
        setData(json.objModel)
    }

    async function insertData(url, datos) {
        const response = await fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        return response.json();
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
        /*
        {
            field: "access",
            headerName: "Access Level",
            flex:1,
            renderCell: ({ row: { access }}) => {
                return (
                    <Box
                    width="60%"
                    m="0 auto"
                    p="5px"
                    display="flex"
                    justifyContent="center"
                    backgroundColor={
                        access === "admin"
                        ? colors.greenAccent[600]
                        : colors.greenAccent[700]
                    }
                    borderRadius="4px"
                >
                    {access ==="admin" && <AdminPanelSettingsOutlinedIcon />}
                    {access ==="manager" && <SecurityOutlinedIcon />}
                    {access ==="user" && <LockOpenOutlinedIcon />}
                    <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                        {access}
                    </Typography>
                </Box>
                )
            }
        }*/
    ]

    return (
        <Box m="20px">
            <Header title="CLIENT" subtitle="Maneja tus clientes" />
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