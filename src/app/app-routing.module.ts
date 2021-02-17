import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component';
import { LoginComponent } from './login/login.component';
import { StartupComponent } from './startup/startup.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'start', component: StartupComponent },
  { path: 'lobby', component: LobbyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
