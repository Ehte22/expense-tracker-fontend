import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addType, addTypeFailure, addTypeSuccess, deleteType, deleteTypeFailure, deleteTypeSuccess, getType, getTypeFailure, getTypeSuccess, updateType, updateTypeFailure, updateTypeSuccess } from "../actions/type.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { TypeService } from "../../services/type.service";
import { ToastService } from "../../services/toast.service";

@Injectable()
export class TypeEffect {
    constructor(
        private $action: Actions,
        private typeService: TypeService,
        private toast: ToastService
    ) { }

    _addType = createEffect(() =>
        this.$action.pipe(
            ofType(addType),
            mergeMap(({ types }) => {
                return this.typeService.addType(types).pipe(
                    map(({ result, message }) => {
                        this.toast.showSuccess(message)
                        return addTypeSuccess({ types: result, message })
                    }),
                    catchError((error) => {
                        this.toast.showError(error.error.message)
                        return of(addTypeFailure(error))
                    })
                )
            })
        )
    )

    _getTypes = createEffect(() =>
        this.$action.pipe(
            ofType(getType),
            mergeMap(({ page, limit, searchType, sortByOrder, isFetchAll }) => {
                return this.typeService.getTypes(page, limit, searchType, sortByOrder, isFetchAll).pipe(
                    map(({ result, message, page, limit, total }) => {
                        return getTypeSuccess({ types: result, message, page, limit, total })
                    }),
                    catchError((error) => {
                        this.toast.showError(error.error.message)
                        return of(getTypeFailure({ error: error.message }))
                    })
                )
            })
        )
    )

    _updateType = createEffect(() =>
        this.$action.pipe(
            ofType(updateType),
            mergeMap(({ id, types }) => {
                return this.typeService.updateType(id, types).pipe(
                    map(({ result, message }) => {
                        this.toast.showSuccess(message)
                        return updateTypeSuccess({ id, types: result, message })
                    }),
                    catchError((error) => {
                        this.toast.showError(error.error.message)
                        return of(updateTypeFailure({ error: error.message }))
                    })
                )
            })
        )
    )
    _deleteType = createEffect(() =>
        this.$action.pipe(
            ofType(deleteType),
            mergeMap(({ id }) => {
                return this.typeService.deleteType(id).pipe(
                    map(({ message }) => {
                        this.toast.showSuccess(message)
                        return deleteTypeSuccess({ id, message })
                    }),
                    catchError((error) => {
                        this.toast.showError(error.error.message)
                        return of(deleteTypeFailure({ error: error.message }))
                    })
                )
            })
        )
    )
}