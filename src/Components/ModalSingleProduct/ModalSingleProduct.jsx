import CloseIcon from "@mui/icons-material/Close";
import { Dialog, useMediaQuery } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import React from "react";

export default function ModalSingleProduct({ open, handleClose }) {
  const handleCloseButton = () => {
    // Закрываем модальное окно
    handleClose();
  };

  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  return (
    <Dialog
      open={open}
      sx={{
        padding: 0,
        margin: isSmallScreen ? 5 : 16,
        borderRadius: 5,
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: "Montserrat, sans-serif",
          paddingTop: isSmallScreen ? 4 : 2,
          background: "rgb(51, 153, 51);",
          color: "white",
          fontSize: isSmallScreen ? 25 : 40,
          textAlign: "center",
        }}
        id="customized-dialog-title"
      >
        Thank you!
      </DialogTitle>
      <DialogTitle
        sx={{
          fontFamily: "Montserrat,sans-serif",
          background: "rgb(51, 153, 51);",
          color: "white",
        }}
        id="customized-dialog-title"
      >
        The product has been successfully added to the cart.
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={handleCloseButton}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          background: "rgb(51, 153, 51);",
          color: "white",
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon sx={{ color: "white" }} />
      </IconButton>
    </Dialog>
  );
}
