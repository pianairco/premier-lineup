import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
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
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {LOCATION_INITIALIZED} from "@angular/common";

const production = [
  { provide: AbstractTeammateService, useClass: TeammateService }
];

const test = [
  { provide: AbstractTeammateService, useClass: MockTeammateService }
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function ApplicationInitializerFactory(translate: TranslateService, injector: Injector) {

  return async () => {

    await injector.get(LOCATION_INITIALIZED, Promise.resolve(null));

    translate.addLangs(['en', 'fa']);

    const defaultLang: string = 'fa';
    translate.setDefaultLang(defaultLang);

    try {
      await translate.use(defaultLang).toPromise();
    } catch (err) {
      console.log(err);
    }

    console.log(`Successfully initialized ${defaultLang} language.`);
  };
}
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
    AngularResizedEventModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    AngularResizedEventModule
  ],
  providers: [
    {
      multi: true,
      provide: APP_INITIALIZER,
      deps: [TranslateService, Injector],
      useFactory: ApplicationInitializerFactory
    },
    ...test // <--- this can be used for a complete mock runtime modus
    // ...production
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
