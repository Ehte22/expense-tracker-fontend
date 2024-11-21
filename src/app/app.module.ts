import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authReducer } from './store/reducers/auth.reducers';
import { AuthEffects } from './store/effects/auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { typeReducer } from './store/reducers/type.reducers';
import { TypeEffect } from './store/effects/type.effects';
import { expenseReducer } from './store/reducers/expense.reducers';
import { ExpenseEffect } from './store/effects/expense.effects';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    NgxChartsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-top-right",
      preventDuplicates: true
    }),
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      auth: authReducer,
      type: typeReducer,
      expense: expenseReducer
    }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([AuthEffects, TypeEffect, ExpenseEffect]),
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false, // Set to true for auto login after reload
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("195321382919-9douqjni4u680jkitrc9ri8o6nvuvt8m.apps.googleusercontent.com")
          }
        ]
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
