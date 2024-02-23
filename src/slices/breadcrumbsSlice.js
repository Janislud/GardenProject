import {createSlice} from '@reduxjs/toolkit'

export const breadcrumbsSlice = createSlice({
    name: 'breadcrumbs',
    initialState: {
        breadcrumbsList: [],
    },
    reducers: {
        setBreadcrumbs: (state, action) => {
            state.breadcrumbsList = action.payload
        },
        addBreadcrumb: (state, action) => {
            state.breadcrumbsList.push(action.payload)
        },
        removeBreadcrumb: (state, action) => {
            state.breadcrumbsList.splice(action.payload, 1)
        }
    }
})

export const {setBreadcrumbs, addBreadcrumb, removeBreadcrumb} = breadcrumbsSlice
export default breadcrumbsSlice.reducer