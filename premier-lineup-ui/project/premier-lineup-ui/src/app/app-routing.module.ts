import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'lineup', pathMatch: 'full' },
  {
    path: 'lineup', loadChildren: () => import('./view/lineup/lineup.module')
      .then(m => m.LineupModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
