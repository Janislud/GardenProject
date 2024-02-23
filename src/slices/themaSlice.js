import { createSlice } from "@reduxjs/toolkit";

const themaSlice = createSlice({
    name: 'theme',
    initialState: {
        mode: JSON.parse(localStorage.getItem('darkMode')) || false
    },
    reducers: {
        toggleTheme: state => {
            state.mode = !state.mode;
            localStorage.setItem('darkMode', JSON.stringify(state.mode))
        }
    }
})

export const { toggleTheme } = themaSlice.actions;
export default themaSlice.reducer;