import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RootComponent} from "@lineup-app/view/root/root.component";
import {HomeComponent} from "@lineup-app/view/home/home.component";

const routes: Routes = [
  { path: '', redirectTo: 'root/home', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./view/auth/auth.module').then(m => m.AuthModule) },
  { path: 'root', component: RootComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'lineup', loadChildren: () => import('./view/lineup/lineup.module').then(m => m.LineupModule) },
      { path: 'setting', loadChildren: () => import('./view/setting/setting.module').then(m => m.SettingModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
