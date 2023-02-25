import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Header from '../../components/Header';

const MeetingForm = () => {

    const { state } = useLocation();

    const [ names, setNames ] = useState(state.item.clientName + ' ' + state.item.clientLastname);

    const initialValues = {
        id: ""
    }

    const handleSubmint = () => {

    }

    const handleFormSubmit = () => {

    }

    return (
        <Box m="20px">
            <Header title='Agendar cita' subtitle='Completa todos los campos necesarios, hay algunos autocompletados' />
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
                                    gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                                >
                                    <Box>
                                        <Typography>
                                            Cliente
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            disabled="true"
                                            onBlur={handleBlur}
                                            onChange={(e) => {setNames(e.target.value)}}
                                            value={names}
                                            name="names"
                                            error={!!touched.names && !!errors.names}
                                            helperText={touched.names && errors.names}
                                        />
                                    </Box>
                                </Box>
                                <Box display="flex" justifyContent="end" mt="20px">
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