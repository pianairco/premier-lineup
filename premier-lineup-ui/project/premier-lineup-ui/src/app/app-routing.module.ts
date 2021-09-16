import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RootComponent} from "@lineup-app/root/root.component";

const routes: Routes = [
  { path: '', redirectTo: 'root/lineup', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./view/auth/auth.module').then(m => m.AuthModule) },
  { path: 'root', component: RootComponent, children: [
      { path: 'lineup', loadChildren: () => import('./view/lineup/lineup.module').then(m => m.LineupModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
