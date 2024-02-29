import CloseIcon from '@mui/icons-material/Close';
import { Dialog } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { cleanCart } from '../../slices/cartSlice';



export default function CustomizedDialogs({ open, handleClose }) {
  const dispatch = useDispatch();

  const handleCloseWithClearCart = () => {
    // Вызываем экшен для очистки корзины
    dispatch(cleanCart());
    // Закрываем модальное окно
    handleClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Modal title
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseWithClearCart} // Заменяем handleClose на handleCloseWithClearCart
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogActions>
        <Button autoFocus onClick={handleCloseWithClearCart}>Save changes</Button>
      </DialogActions>
    </Dialog>
  );
}
