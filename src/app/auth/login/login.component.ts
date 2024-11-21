import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthStateType } from '../../models/auth';
import { signIn, signInWithGoogle } from '../../store/actions/auth.actions';
import { environment } from '../../../environment/enrironement';
declare const google: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  signInForm: FormGroup = new FormGroup({})

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ auth: AuthStateType }>,
  ) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required],
    })

    google.accounts.id.initialize({
      client_id: environment.GOOGLE_CLIENT_ID,
      callback: (res: any) => this.signInWithGoogle(res)
    });

    google.accounts.id.renderButton(
      document.getElementById('google-btn'),
      { theme: 'outline', size: 'large', shape: 'rectangle', width: 50 }
    );

  }


  onSubmit() {
    if (this.signInForm.valid) {
      this.store.dispatch(signIn({ userData: this.signInForm.value }))
      console.log(this.signInForm.value)
    } else {
      this.signInForm.markAllAsTouched()
    }

  }

  customValidator(value: string): string {
    return this.signInForm.get(value)?.touched && this.signInForm.get(value)?.invalid ? 'is-invalid' : ''
  }

  signInWithGoogle(token: string): void {
    if (token) {
      this.store.dispatch(signInWithGoogle({ googleData: token }))
    }
  }

}
