import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalActive: false,
    product: null,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            console.log('Opening modal with product:', action.payload);
            state.modalActive = true;
            state.product = action.payload;
        },
        closeModal: (state) => {
            state.modalActive = false;
            state.product = null;
        }
    }
})

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer