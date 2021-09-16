import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LineupRoutingModule} from './lineup-routing.module';
import {LineupComponent} from './lineup.component';
import {AngularResizedEventModule} from 'angular-resize-event';
import {SharedModule} from '@lineup-app/shared/shared.module';


@NgModule({
  declarations: [LineupComponent],
    imports: [
        CommonModule,
        LineupRoutingModule,
        AngularResizedEventModule,
        SharedModule
    ]
})
export class LineupModule { }
