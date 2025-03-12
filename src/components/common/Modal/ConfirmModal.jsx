import React from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";

const ConfirmModal = ({ open, handleClose, handleConfirm, title, message }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="confirm-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="confirm-modal-title" variant="h6">
          {title || "Confirm Action"}
        </Typography>
        <Typography sx={{ mt: 2 }}>{message || "Are you sure you want to proceed?"}</Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
          <Button variant="contained" color="error" onClick={handleClose}>
            No
          </Button>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Yes
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
