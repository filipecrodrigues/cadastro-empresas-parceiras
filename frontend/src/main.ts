import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  ...appConfig, // espalha tudo que já estava no appConfig
  providers: [
    ...(appConfig.providers || []), // mantém os providers que já estavam
    importProvidersFrom(HttpClientModule) // adiciona o HttpClient
  ]
})
.catch((err) => console.error(err));
