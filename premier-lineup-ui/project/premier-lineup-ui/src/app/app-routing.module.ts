import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RootComponent} from "@lineup-app/view/root/root.component";
import {HomeComponent} from "@lineup-app/view/home/home.component";
import {LoginGuard} from "@lineup-app/core/guard/login.guard";

const routes: Routes = [
  { path: '', redirectTo: 'root/home', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./view/auth/auth.module').then(m => m.AuthModule) },
  { path: 'root', component: RootComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'authenticated', canActivate: [ LoginGuard ], runGuardsAndResolvers: 'always', children: [
          { path: 'lineup', loadChildren: () => import('./view/lineup/lineup.module').then(m => m.LineupModule) },
          { path: 'setting', loadChildren: () => import('./view/setting/setting.module').then(m => m.SettingModule) },
          { path: 'group', loadChildren: () => import('./view/group/group.module').then(m => m.GroupModule) },
        ]
      }
    ]
  },
  { path: 'group', loadChildren: () => import('./view/group/group.module').then(m => m.GroupModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
