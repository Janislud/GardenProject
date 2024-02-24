import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    breadcrumbsList: [],
  };
  
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

export const {setBreadcrumbs, addBreadcrumb, removeBreadcrumb} = breadcrumbsSlice.actions
export default breadcrumbsSlice.reducer