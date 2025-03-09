import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import { LOCALE_ID } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import {
  LuxonDateAdapter,
  provideLuxonDateAdapter,
} from "@angular/material-luxon-adapter";
import { registerLocaleData } from "@angular/common";
import localeIt from "@angular/common/locales/it";

registerLocaleData(localeIt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    { provide: LOCALE_ID, useValue: "it-IT" },
    { provide: MAT_DATE_LOCALE, useValue: "it-IT" },
    provideLuxonDateAdapter(),
  ],
};
