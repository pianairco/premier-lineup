import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineupRoutingModule } from './lineup-routing.module';
import { LineupComponent } from './lineup.component';
import {AngularResizedEventModule} from 'angular-resize-event';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [LineupComponent],
  imports: [
    CommonModule,
    LineupRoutingModule,
    AngularResizedEventModule,
    FormsModule
  ]
})
export class LineupModule { }
