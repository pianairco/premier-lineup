import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@lineup-app/app-routing.module';
import { AppComponent } from '@lineup-app/app.component';
import { SquadComponent } from '@lineup-app/component/squad/squad.component';
import { TestComponent } from '@lineup-app/component/test/test.component';
import {OrthoComponent} from '@lineup-app/component/ortho/ortho.component';
import {Squad2dComponent} from '@lineup-app/component/squad2d/squad2d.component';
import {AngularResizedEventModule} from 'angular-resize-event';
import {AbstractTeammateService} from '@lineup-app/service/teammate/abstract-teammate.service';
import {TeammateService} from '@lineup-app/service/teammate/teammate.service';
import {MockTeammateService} from '@lineup-app/service/teammate/mock-teammate.service';

const production = [
  { provide: AbstractTeammateService, useClass: TeammateService }
];

const test = [
  { provide: AbstractTeammateService, useClass: MockTeammateService }
];

@NgModule({
  declarations: [
    AppComponent,
    SquadComponent,
    Squad2dComponent,
    TestComponent,
    OrthoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularResizedEventModule
  ],
  exports: [
    AngularResizedEventModule
  ],
  providers: [
    ...test // <--- this can be used for a complete mock runtime modus
    // ...production
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
