import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, map, mergeMap, of } from "rxjs"
import { resetPassword, resetPasswordFailure, resetPasswordSuccess, signIn, signInFailure, signInSuccess, signInWithGoogle, signInWithGoogleFail, signInWithGoogleSuccess, signOut, signOutFailure, signOutSuccess, signUp, signUpFailure, signUpSuccess, verifyEmail, verifyEmailFailure, verifyEmailSuccess, verifyOTP, verifyOTPFailure, verifyOTPSuccess } from "../actions/auth.actions"
import { AuthService } from "../../services/auth.service"
import { Router } from "@angular/router"
import { ToastService } from "../../services/toast.service"

@Injectable()
export class AuthEffects {
    constructor(
        private $action: Actions,
        private authService: AuthService,
        private toast: ToastService,
        private router: Router
    ) { }

    _signUp = createEffect(() =>
        this.$action.pipe(
            ofType(signUp),
            mergeMap(({ userData }) => {
                return this.authService.signUp(userData).pipe(
                    map(({ result, message }) => {
                        this.toast.showSuccess(message)
                        this.router.navigate(['/'])
                        return signUpSuccess({ user: result, message })
                    }),
                    catchError((error) => {
                        this.toast.showError(error.error.message)
                        return of(signUpFailure({ error: error.message }))
                    })
                )
            })
        )
    )

    _signIn = createEffect(() =>
        this.$action.pipe(
            ofType(signIn),
            mergeMap(({ userData }) => {
                return this.authService.signIn(userData).pipe(
                    map(({ result, message }) => {
                        localStorage.setItem("auth", JSON.stringify(result))
                        this.toast.showSuccess(message)
                        this.router.navigate(['/dashboard'])
                        return signInSuccess({ user: result, message })
                    }),
                    catchError((error) => {
                        this.toast.showError(error.error.message)
                        return of(signInFailure({ error: error.message }))
                    })
                )
            })
        )
    )

    _signOut = createEffect(() =>
        this.$action.pipe(
            ofType(signOut),
            mergeMap((action) => {
                return this.authService.signOut().pipe(
                    map(({ message }) => {
                        localStorage.removeItem("auth")
                        this.toast.showSuccess(message)
                        this.router.navigate(['/'])
                        return signOutSuccess({ message })
                    }),
                    catchError((error) => {
                        this.toast.showError(error.error.message)
                        return of(signOutFailure({ error: error.message }))
                    })
                )
            })
        )
    )

    _signInWithGoogle = createEffect(() =>
        this.$action.pipe(
            ofType(signInWithGoogle),
            mergeMap(({ googleData }) => {
                return this.authService.singInWithGoogle(googleData).pipe(
                    map(({ result, message }) => {
                        localStorage.setItem("auth", JSON.stringify(result))
                        this.router.navigate(['/dashboard'])
                        this.toast.showSuccess(message)
                        return signInWithGoogleSuccess({ user: result, message })
                    }),
                    catchError((error) => {
                        this.toast.showError(error.error.message)
                        return of(signInWithGoogleFail({ error: error.message }))
                    })
                )
            })
        )
    )

    _verifyEmail = createEffect(() =>
        this.$action.pipe(
            ofType(verifyEmail),
            mergeMap(({ email }) => {
                return this.authService.verifyEmail(email).pipe(
                    map(({ message }) => {
                        this.toast.showSuccess(message)
                        return verifyEmailSuccess({ message })
                    }),
                    catchError((error) => {
                        this.toast.showError(error.error.message)
                        return of(verifyEmailFailure({ error: error.message }))
                    })
                )
            })
        )
    )

    _verifyOTP = createEffect(() =>
        this.$action.pipe(
            ofType(verifyOTP),
            mergeMap(({ otp }) => {
                return this.authService.verifyOTP(otp).pipe(
                    map(({ message }) => {
                        this.toast.showSuccess(message)
                        return verifyOTPSuccess({ message })
                    }),
                    catchError((error) => {
                        this.toast.showError(error.error.message)
                        return of(verifyOTPFailure({ error: error.message }))
                    })
                )
            })
        )
    )

    _resetPassword = createEffect(() =>
        this.$action.pipe(
            ofType(resetPassword),
            mergeMap(({ resetPassword }) => {
                return this.authService.resetPassword(resetPassword).pipe(
                    map(({ message }) => {
                        this.toast.showSuccess(message)
                        this.router.navigate(['/'])
                        return resetPasswordSuccess({ message })
                    }),
                    catchError((error) => {
                        this.toast.showError(error.error.message)
                        return of(resetPasswordFailure({ error: error.message }))
                    })
                )
            })
        )
    )

}