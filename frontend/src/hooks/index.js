import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { AuthContext } from '../contexts/index';


export const useAuth = () => useContext(AuthContext);

export const useFetch = (fetchFunc) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => {
        return state.chat.loading;
    })

    useEffect(() => {
        dispatch(fetchFunc());
    }, [fetchFunc, dispatch]);

    return data
}
