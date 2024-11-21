import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthStateType } from '../../models/auth';
import { signOut } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  username: string | null = null

  constructor(
    private store: Store<{ auth: AuthStateType }>
  ) { }

  ngOnInit(): void {
    const x = localStorage.getItem("auth")
    if (x) {
      const user = JSON.parse(x)
      this.username = user.name
    }
  }

  signOut() {
    this.store.dispatch(signOut())
  }

}
