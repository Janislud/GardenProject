import CloseIcon from "@mui/icons-material/Close";
import { Dialog, useMediaQuery } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import React from "react";

export default function ModalUserForm({ open, handleClose }) {
  const handleCloseButton = () => {
    // Закрываем модальное окно
    handleClose();
  };

  const isSmallScreen = useMediaQuery("(max-width: 800px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 590px)");

  return (
    <Dialog
      open={open}
      sx={{
        padding: 0,
        margin: isVerySmallScreen ? 4 : 16,
        borderRadius: 5,
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: "Montserrat, sans-serif",
          paddingTop: isSmallScreen ? 5 : 2,
          background: "rgb(51, 153, 51);",
          color: "white",
          fontSize: isSmallScreen ? 25 : 40,
          textAlign: "center",
        }}
        id="customized-dialog-title"
      >
        Thank you for your registration!
      </DialogTitle>
      <DialogTitle
        sx={{
          fontFamily: "Montserrat,sans-serif",
          background: "rgb(51, 153, 51);",
          color: "white",
          fontSize: isSmallScreen ? 20 : 25,
          textAlign: "center",
        }}
        id="customized-dialog-title"
      >
        Please check your Email and enjoy the promo code of 5%!
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
