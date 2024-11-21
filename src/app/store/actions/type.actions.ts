import { createAction, props } from "@ngrx/store";
import { Type } from "../../models/type";

export const addType = createAction("add type", props<{ types: Type }>())
export const addTypeSuccess = createAction("add type success", props<{ types: Type, message: string }>())
export const addTypeFailure = createAction("add type fail", props<{ error: string }>())

export const getType = createAction("get type", props<{ page: number, limit: number, searchType: string, sortByOrder: string, isFetchAll?: boolean }>())
export const getTypeSuccess = createAction("get type success", props<{ types: Type[], message: string, page: number, limit: number, total: number }>())
export const getTypeFailure = createAction("get type fail", props<{ error: string }>())

export const updateType = createAction("update type ", props<{ types: Type, id: string }>())
export const updateTypeSuccess = createAction("update type success", props<{ id: string, types: Type, message: string }>())
export const updateTypeFailure = createAction("update type fail", props<{ error: string }>())

export const deleteType = createAction("delete type ", props<{ id: string }>())
export const deleteTypeSuccess = createAction("delete type success", props<{ id: string, message: string }>())
export const deleteTypeFailure = createAction("delete type fail", props<{ error: string }>())