import CloseIcon from "@mui/icons-material/Close";
import { Dialog } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { useDispatch } from "react-redux";
import { cleanCart } from "../../slices/cartSlice";

export default function ModalCart({ open, handleClose }) {
  const dispatch = useDispatch();

  const handleCloseWithClearCart = () => {
    // Вызываем экшен для очистки корзины
    dispatch(cleanCart());
    // Закрываем модальное окно
    handleClose();
  };

  return (
    <Dialog open={open} sx={{ padding: 0, margin: 16, borderRadius: 5 }}>
      <DialogTitle
        sx={{
          fontFamily: "Montserrat, sans-serif",
          paddingTop: 2,
          background: "rgb(51, 153, 51);",
          color: "white",
          fontSize: 40,
          textAlign: "center",
        }}
        id="customized-dialog-title"
      >
        Congratulations!
      </DialogTitle>
      <DialogTitle
        sx={{
          fontFamily: "Montserrat,sans-serif",
          background: "rgb(51, 153, 51);",
          color: "white",
        }}
        id="customized-dialog-title"
      >
        Your order has been successfully placed on the website.
      </DialogTitle>
      <DialogTitle
        sx={{
          fontFamily: "Montserrat,sans-serif",
          paddingBottom: 2,
          background: "rgb(51, 153, 51);",
          color: "white",
        }}
        id="customized-dialog-title"
      >
        A manager will contact you shortly to confirm your order.
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseWithClearCart}
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
