
import { useEffect } from 'react';
import { useGetCategoriesByIdQuery } from '../slices/apiSlice';


export const MainPage = () => {
    
const { data, error, isLoading } = useGetCategoriesByIdQuery(3);

useEffect(() => {
    if (error) {
        console.log("Error fetchig data:" , error);
    }
},[error]);

useEffect(() => {
    if (isLoading) {
        console.log("Loading");
    } else if (data) {
        console.log("Data:",data)
    }
},[isLoading,data,error])

    
    return <div>
        1
    </div>
}