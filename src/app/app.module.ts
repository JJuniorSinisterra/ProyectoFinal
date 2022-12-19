import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

import { PageprincipalComponent } from './pageprincipal/pageprincipal.component';
import { PagesModule } from './pages/pages.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule} from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { SharedModule } from "./shared/shared.module";
import { PagesRoutingModule } from './pages/pages-routing.module';
import { PageprincipalModule } from "./pageprincipal/pageprincipal.module";


@NgModule({
    declarations: [
        AppComponent,
        PageprincipalComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        PagesModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        SharedModule,
        PagesRoutingModule,
        PageprincipalModule
    ]
})
export class AppModule { }
