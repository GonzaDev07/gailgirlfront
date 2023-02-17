import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import React from 'react';
import Modal from '@mui/material/Modal';
import Form from "../form/index";
import { tokens } from '../../../themes';
import { useTheme } from '@mui/material';



const BasicModal = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box m="20px">
            <Button variant="contained" onClick={handleOpen}>Open modal</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
                <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>Close modal</Button> */}
                <Form/>
              </Box>
            </Modal>
        </Box>
  );
}

export default BasicModal;