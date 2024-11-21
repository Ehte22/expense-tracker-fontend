import { createReducer, on } from "@ngrx/store";
import { TypeState } from "../../models/type";
import { addType, addTypeFailure, addTypeSuccess, deleteType, deleteTypeFailure, deleteTypeSuccess, getType, getTypeFailure, getTypeSuccess, updateType, updateTypeFailure, updateTypeSuccess } from "../actions/type.actions";

const initialState: TypeState = { types: [], message: "", error: null, loading: false, page: 1, limit: 5, total: 0, isDeleteSuccess: false }

export const typeReducer = createReducer(
    initialState,
    on(addType, (state, action) => {
        return { ...state, loading: true }
    }),
    on(addTypeSuccess, (state, { types, message }) => {
        return { ...state, types: [types, ...state.types].slice(0, 5), message, loading: false, total: state.total + 1 }
    }),
    on(addTypeFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

    on(getType, (state, action) => {
        return { ...state, loading: true }
    }),
    on(getTypeSuccess, (state, { types, message, page, limit, total }) => {
        return { ...state, types, loading: false, page, limit, total, message, isDeleteSuccess: false, }
    }),
    on(getTypeFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

    on(updateType, (state, action) => {
        return { ...state, loading: true }
    }),
    on(updateTypeSuccess, (state, { id, types, message }) => {
        const x = state.types.map(item => item._id === id ? types : item)
        return { ...state, types: x, message, loading: false }
    }),
    on(updateTypeFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

    on(deleteType, (state, action) => {
        return { ...state, loading: true }
    }),
    on(deleteTypeSuccess, (state, { id, message }) => {
        const x = state.types.filter(item => item._id !== id)
        return { ...state, types: x, message, loading: false, isDeleteSuccess: true }
    }),
    on(deleteTypeFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

)