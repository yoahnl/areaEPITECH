import { NgModule                         } from '@angular/core';
import { BrowserModule                    } from '@angular/platform-browser';
import { RouteReuseStrategy               } from '@angular/router';

import { IonicModule, IonicRouteStrategy  } from '@ionic/angular';
import { SplashScreen                     } from '@ionic-native/splash-screen/ngx';
import { StatusBar                        } from '@ionic-native/status-bar/ngx';

import { AppComponent                     } from './app.component';
import { AppRoutingModule                 } from './app-routing.module';
import { FormsModule                      } from '@angular/forms';
import { CommonModule                     } from '@angular/common';
import { HomeComponent                    } from './home/home.component';
import { AngularFireModule                } from '@angular/fire';
import { AngularFireAuthModule            }from '@angular/fire/auth';
import { HttpClientModule                 } from '@angular/common/http';
import { firebaseConfig                   }from './firebase';
import {ProfileComponent} from './profile/profile.component';
import {ServiceComponent} from './service/service.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {LoginComponent} from './login/login.component';
import * as Parse                   from 'parse';
import {TriggerComponent} from './trigger/trigger.component';
import {ActiveTriggerComponent} from './active-trigger/active-trigger.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

Parse.initialize('morningstareip', 'morningstareipMaster_KEY');
(Parse as any).serverURL = 'https://morningstareip.herokuapp.com/parse';

@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent,
      ProfileComponent,
      ServiceComponent,
      EditProfileComponent,
      TriggerComponent,
      ActiveTriggerComponent,
  ],
  entryComponents: [
      ActiveTriggerComponent,
      EditProfileComponent,
  ],
  imports: [
      BrowserModule,
      FormsModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      HttpClientModule,
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
