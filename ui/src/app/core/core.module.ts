import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from '@app/shared/guards/auth.guard';
import { NgxDfCustom } from '@app/shared/ngx-custom.module';
import {
  DfHttpErrorInterceptor,
  DfHttpIEInterceptor
} from '@devfactory/ngx-df/interceptor';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthenticationService } from '@app/core/services/authentication.service';
import { NotificationService } from '@app/core/services/notification.service';
import { StorageService } from '@app/core/services/storage.service';
import { UserService } from '@app/core/services/user.service';

/**
 * The Core module is used to hold all root-level providers. It should only be imported in the AppModule.
 */
@NgModule({
  /** Place all forRoot() imports here */
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    LayoutModule,
    OverlayModule,
    NgxDfCustom.forRoot(),
    NgbDropdownModule.forRoot(),
    NgbTooltipModule.forRoot(),
    BrowserAnimationsModule
  ],
  /** Place all services/providers/injection tokens here here */
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: DfHttpLoaderInterceptor,
    //   multi: true,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DfHttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DfHttpIEInterceptor,
      multi: true
    },
    /** Provide your app wide services here */
    StorageService,
    AuthenticationService,
    UserService,
    NotificationService,

    /** Guards */
    AuthGuard
  ]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
