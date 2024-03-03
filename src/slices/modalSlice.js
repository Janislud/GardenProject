import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalActive: false,
    products: [],
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            console.log('Opening modal with product:', action.payload);
            state.modalActive = true;
            state.products = action.payload?.length ? action.payload.filter((product) => product.discont_price) : [];
        },
        closeModal: (state) => {
            state.modalActive = false;
            state.products = null;
        }
    }
})

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer