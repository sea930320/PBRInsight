
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//----------------component----------------------//
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

//-----------------service-----------------------//
import { GlobalConstants } from './shared/_constants/global.constants';
import { AuthService } from './shared/_auth/auth.service';
import { AuthGuard } from './shared/_auth/auth-guard.service';
import { JwtInterceptor } from './shared/_helpers/jwt.interceptor';

//------------------plugins----------------------//
import * as $ from 'jquery';


@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent
    ],
    imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        NgbModule.forRoot()
    ],
    providers: [
        GlobalConstants,
        AuthService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }