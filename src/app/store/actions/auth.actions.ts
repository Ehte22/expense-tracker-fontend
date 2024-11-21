import { createAction, props } from "@ngrx/store";
import { Auth, Login } from "../../models/auth";

export const signUp = createAction("signup user", props<{ userData: Auth }>())
export const signUpSuccess = createAction("signup user success", props<{ user: Auth, message: string }>())
export const signUpFailure = createAction("signup user fail", props<{ error: string }>())

export const signIn = createAction("signin user", props<{ userData: Login }>())
export const signInSuccess = createAction("signin user success", props<{ user: Login, message: string }>())
export const signInFailure = createAction("signin user fail", props<{ error: string }>())

export const signOut = createAction("signout user")
export const signOutSuccess = createAction("signout user success", props<{ message: string }>())
export const signOutFailure = createAction("signout user fail", props<{ error: string }>())

export const signInWithGoogle = createAction("[Google] LOGIN", props<{ googleData: string }>())
export const signInWithGoogleSuccess = createAction("[Google] LOGIN SUCCESS", props<{ user: Login, message: string }>())
export const signInWithGoogleFail = createAction("[Google] LOGIN FAIL", props<{ error: string }>())

export const verifyEmail = createAction("[EMAIL] VERIFY", props<{ email: string }>())
export const verifyEmailSuccess = createAction("[EMAIL] VERIFY SUCCESS", props<{ message: string }>())
export const verifyEmailFailure = createAction("[EMAIL] VERIFY FAIL", props<{ error: string }>())

export const verifyOTP = createAction("[OTP] VERIFY", props<{ otp: string }>())
export const verifyOTPSuccess = createAction("[OTP] VERIFY SUCCESS", props<{ message: string }>())
export const verifyOTPFailure = createAction("[OTP] VERIFY FAIL", props<{ error: string }>())

export const resetPassword = createAction("[PASSWORD RESET] VERIFY", props<{ resetPassword: string }>())
export const resetPasswordSuccess = createAction("[PASSWORD RESET] VERIFY SUCCESS", props<{ message: string }>())
export const resetPasswordFailure = createAction("[PASSWORD RESET] VERIFY FAIL", props<{ error: string }>())