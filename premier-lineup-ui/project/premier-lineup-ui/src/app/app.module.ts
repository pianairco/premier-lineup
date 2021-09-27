import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';

import {AppRoutingModule} from '@lineup-app/app-routing.module';
import {AppComponent} from '@lineup-app/app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {CommonModule, LOCATION_INITIALIZED} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AbstractTeammateService} from '@lineup-app/rest/service/teammate/abstract-teammate.service';
import {MockTeammateService} from '@lineup-app/rest/service/teammate/mock-teammate.service';
import {TeammateService} from '@lineup-app/rest/service/teammate/teammate.service';
import {TopbarComponent} from './core/component/topbar/topbar.component';
import {SharedModule} from "@lineup-app/shared/shared.module";
import {RootComponent} from './view/root/root.component';
import {HomeComponent} from './view/home/home.component';
import {InitializerService} from "@lineup-app/core/service/initializer.service";
import {AlertComponent} from './core/component/alert/alert.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ClipboardModule} from "@angular/cdk/clipboard";

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
    TopbarComponent,
    RootComponent,
    HomeComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ClipboardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule
  ],
  exports: [
    BrowserModule,
    ClipboardModule,
  ],
  providers: [
    {
      multi: true,
      provide: APP_INITIALIZER,
      deps: [TranslateService, Injector],
      useFactory: ApplicationInitializerFactory
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (initializerService: InitializerService) => () => initializerService.load(),
      deps: [InitializerService],
      multi: true
    },
    ...test // <--- this can be used for a complete mock runtime modus
    // ...production
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
