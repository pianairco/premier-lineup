import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LineupComponent } from './lineup.component';

const routes: Routes = [{ path: '', component: LineupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LineupRoutingModule { }
