import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, Login } from '../models/auth';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = environment.BACKEND_URL = 'auth'

  constructor(
    private http: HttpClient
  ) { }

  signUp(userData: Auth): Observable<{ result: Auth, message: string }> {
    return this.http.post<{ result: Auth, message: string }>(`${this.baseUrl}/signUp`, userData, {
      withCredentials: true
    })
  }

  signIn(userData: Login): Observable<{ result: Login, message: string }> {
    return this.http.post<{ result: Login, message: string }>(`${this.baseUrl}/signIn`, userData, {
      withCredentials: true
    })
  }

  signOut(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/signOut`, {}, {
      withCredentials: true
    })
  }

  singInWithGoogle(googleData: string): Observable<{ result: Login, message: string }> {
    return this.http.post<{ result: Login, message: string }>(`${this.baseUrl}/signIn-with-google`, googleData, {
      withCredentials: true
    })
  }

  verifyEmail(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/verify-email`, email, {
      withCredentials: true
    })
  }

  verifyOTP(otp: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/verify-otp`, { otp }, {
      withCredentials: true
    })
  }

  resetPassword(resetPassword: string): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(`${this.baseUrl}/reset-password`, resetPassword, {
      withCredentials: true
    })
  }
}
