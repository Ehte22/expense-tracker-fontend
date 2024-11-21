import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatisticsComponent } from './statistics/statistics.component';
import { authGuard } from '../guards/auth.guard';
import { DailyComponent } from './daily/daily.component';

const routes: Routes = [
  {
    path: "", canActivate: [authGuard], children: [
      { path: "", component: HomeComponent, title: "Home" },
      { path: "statistics/:id", component: StatisticsComponent, title: "Statictics" },
      { path: "daily/:id", component: DailyComponent, title: "Home" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, NgxChartsModule]
})
export class DashboardRoutingModule { }
