import { createReducer, on } from "@ngrx/store";
import { AuthStateType } from "../../models/auth";
import { resetPassword, resetPasswordFailure, resetPasswordSuccess, signIn, signInFailure, signInSuccess, signInWithGoogle, signInWithGoogleFail, signInWithGoogleSuccess, signOut, signOutFailure, signOutSuccess, signUp, signUpFailure, signUpSuccess, verifyEmail, verifyEmailFailure, verifyEmailSuccess, verifyOTP, verifyOTPFailure, verifyOTPSuccess } from "../actions/auth.actions";

const initialState: AuthStateType = { user: null, message: "", error: null, loading: false, isEmailVerifiedSuccess: false, isOtpVerifiedSuccess: false }

export const authReducer = createReducer(
    initialState,
    on(signUp, (state, action) => {
        return { ...state, loading: true }
    }),
    on(signUpSuccess, (state, { user, message }) => {
        return { ...state, user, message, loading: false }
    }),
    on(signUpFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

    on(signIn, (state, action) => {
        return { ...state, loading: true }
    }),
    on(signInSuccess, (state, { user, message }) => {
        return { ...state, user, message, loading: false }
    }),
    on(signInFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

    on(signOut, (state, action) => {
        return { ...state, loading: true }
    }),
    on(signOutSuccess, (state, { message }) => {
        return { ...state, message, loading: false }
    }),
    on(signOutFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

    on(signInWithGoogle, (state, action) => {
        return { ...state, loading: true }
    }),
    on(signInWithGoogleSuccess, (state, { user, message }) => {
        return { ...state, user, message, loading: false }
    }),
    on(signInWithGoogleFail, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

    on(verifyEmail, (state, action) => {
        return { ...state, loading: true }
    }),
    on(verifyEmailSuccess, (state, { message }) => {
        return { ...state, message, loading: false, isEmailVerifiedSuccess: true }
    }),
    on(verifyEmailFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

    on(verifyOTP, (state, action) => {
        return { ...state, loading: true }
    }),
    on(verifyOTPSuccess, (state, { message }) => {
        return { ...state, message, loading: false, isOtpVerifiedSuccess: true }
    }),
    on(verifyOTPFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

    on(resetPassword, (state, action) => {
        return { ...state, loading: true }
    }),
    on(resetPasswordSuccess, (state, { message }) => {
        return { ...state, message, loading: false }
    }),
    on(resetPasswordFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),
)