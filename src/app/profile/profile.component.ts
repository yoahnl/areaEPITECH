import { Component, OnInit    } from '@angular/core';
import { ModalController      } from '@ionic/angular';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { AngularFireAuth      } from '@angular/fire/auth';
import { auth                 } from 'firebase/app';
import * as Parse               from 'parse';

import User = Parse.User;
import {ServiceToken} from '../model/service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit
{

  username    : string;
  email       : string;
  firstname   : string;
  lastname    : string;
  userTokens  : ServiceToken[] = [];

  constructor(public modalController: ModalController, public afAuth: AngularFireAuth) { }

  ngOnInit() {}

  ionViewWillEnter()
  {
    let user        = User.current();
    this.username   = user.getUsername();
    this.email      = user.getEmail();
    this.firstname  = user.get('firstName');
    this.lastname   = user.get('lastName');
    this.getServiceToken();
  }


  async editProfile()
  {

    const modal = await this.modalController.create({
      component: EditProfileComponent
    });
    return await modal.present().then(() => {
      this.ionViewWillEnter();
    });
  }

  async getServiceToken()
  {
    let user = User.current();
    this.userTokens = [];
    this.userTokens = user.get('token');
    console.log(this.userTokens);
    if (this.userTokens == null || this.userTokens.length == 0)
    {
      alert("service connection must be set");
      this.setFirstServiceToken();
    }
  }

  async setFirstServiceToken()
  {
    const service = Parse.Object.extend("Services");
    let user = User.current();
    const query = new Parse.Query(service);
    const results = await query.find();
    let tokens: ServiceToken[] = [];

    for (let result of results)
    {
      tokens.push({
        name        : result.get('Name'),
        logo        : result.get('Logo'),
        objectId    : result.id,
        accessToken : "",
        secretToken : "",
        isConnected : false,
      });
    }
    this.userTokens = tokens;
    console.log(this.userTokens);
    user.set('token', this.userTokens);
    user.save();
  }

  connectToService(serviceName: string)
  {
    console.log(serviceName);
    switch (serviceName)
    {
      case "Youtube":
        this.GoogleAuth();
        break;
      case "Twitter":
        this.TwitterAuth();
        break;
      case "Facebook":
        this.FacebookrAuth();
        break;
      case "Github":
        this.GitHubAuth();
        break;
      default:
        alert("no auth provider for this service" + serviceName);
    }
  }

  GoogleAuth()
  {
    const provider = new auth.GoogleAuthProvider();
    const credential = this.afAuth.auth.signInWithPopup(provider).then((data) => {
      console.log(data.credential);
      // @ts-ignore
      this.setNewToken("Youtube", data.credential.accessToken, data.credential.secret);
    });
  }

  FacebookrAuth()
  {
    const provider = new auth.FacebookAuthProvider();
    const credential = this.afAuth.auth.signInWithPopup(provider).then((data) => {
      console.log(data.credential);
      // @ts-ignore
      this.setNewToken("Facebook", data.credential.accessToken, data.credential.secret);

    });
  }

  TwitterAuth()
  {
    const provider = new auth.TwitterAuthProvider();
    const credential = this.afAuth.auth.signInWithPopup(provider).then((data) => {
      console.log(data.credential);
      // @ts-ignore
      this.setNewToken("Twitter", data.credential.accessToken, data.credential.secret);
    });
  }

  GitHubAuth()
  {
    const provider = new auth.GithubAuthProvider();
    const credential = this.afAuth.auth.signInWithPopup(provider).then((data) => {
      console.log(data.credential);
      // @ts-ignore
      this.setNewToken("Github", data.credential.accessToken, data.credential.secret);

    });
  }

  setNewToken(serviceName: string, accessToken: string, secretToken: string)
  {
    let user = User.current();
    for (let index in this.userTokens)
    {
      if (this.userTokens[index].name == serviceName)
      {
        this.userTokens[index].accessToken  = accessToken;
        this.userTokens[index].secretToken  = secretToken;
        this.userTokens[index].isConnected  = true;
        user.set('token', this.userTokens);
        user.save().then((data) => {
          this.userTokens = [];
          this.getServiceToken();
        });
      }
    }
  }

  disconnectToService(serviceName: string)
  {
    let user = User.current();
    for (let index in this.userTokens)
    {
      if (this.userTokens[index].name == serviceName)
      {
        this.userTokens[index].accessToken  = "";
        this.userTokens[index].isConnected  = false;
        user.set('token', this.userTokens);
        user.save().then((data) => {
          this.userTokens = [];
          this.getServiceToken();
        });
      }
    }
  }
}
