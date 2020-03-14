/* Angular Module */
import { NgModule                           } from '@angular/core';
import { BrowserModule                      } from '@angular/platform-browser';
import { RouteReuseStrategy                 } from '@angular/router';
import { ServiceWorkerModule                } from '@angular/service-worker';
import { FormsModule                        } from '@angular/forms';
import { CommonModule                       } from '@angular/common';
import { HttpClientModule                   } from '@angular/common/http';
import { environment                        } from '../environments/environment';
/* Angular Module End */

/* Ionic Module */
import { IonicModule, IonicRouteStrategy    } from '@ionic/angular';
import { SplashScreen                       } from '@ionic-native/splash-screen/ngx';
import { StatusBar                          } from '@ionic-native/status-bar/ngx';
/* Ionic Module End */

/* Firebase */
import { AngularFireModule                  } from '@angular/fire';
import { AngularFireAuthModule              } from '@angular/fire/auth';
import { firebaseConfig                     } from './firebase';
import { AppRoutingModule                   } from './app-routing.module';
/* Firebase End*/

/* Component */
import { HomeComponent                      } from './home/home.component';
import { AppComponent                       } from './app.component';
import { ProfileComponent                   } from './profile/profile.component';
import { ServiceComponent                   } from './service/service.component';
import { EditProfileComponent               } from './edit-profile/edit-profile.component';
import { LoginComponent                     } from './login/login.component';
import { TriggerComponent                   } from './trigger/trigger.component';
import { ActiveTriggerComponent             } from './active-trigger/active-trigger.component';
/* Component End*/


/* Parse */
import * as Parse from 'parse';
Parse.initialize('morningstareip', 'morningstareipMaster_KEY');
(Parse as any).serverURL = 'https://morningstareip.herokuapp.com/parse';
/* Parse End */


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
      CommonModule,
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
