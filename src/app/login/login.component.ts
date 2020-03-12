import {Component, OnInit                } from '@angular/core';


import {MenuController, NavController    } from '@ionic/angular';
import * as Parse                          from 'parse';
import User = Parse.User;
import {PromptActionButtonTitle, PromptActionLabelLogin, UserInfo} from '../model/UserInfo';


@Component({
  selector   : 'app-login',
  templateUrl: './login.component.html',
  styleUrls  : ['./login.component.scss'],
})
export class LoginComponent implements OnInit
{

  promptLabel           : PromptActionLabelLogin = PromptActionLabelLogin.login;
  promptLabelButtonTitle: PromptActionButtonTitle = PromptActionButtonTitle.login;
  isLogin               : boolean = true;
  showLoader            : boolean = false;
  userInfo              : UserInfo = new class implements UserInfo
  {
    email   : string;
    password: string;
    username: string;
  };

  constructor(
      public menuCtrl       : MenuController,
      private navController : NavController)
  { }

  ionViewWillEnter()
  {
    this.menuCtrl.enable(false);
  }

  ngOnInit()
  {
    var currentUser = User.current();
    if (currentUser)
    {
      this.navController.navigateRoot('/');
    }
  }

  async login(userInfo: UserInfo)
  {
    this.showLoader = true;
    if (this.isLogin)
    {
      try {
        await User.logIn(userInfo.email, userInfo.password).then(() => {
          console.log("user login");
          this.navController.navigateRoot('');
        })

      } catch (e) {
        alert(e);
        console.log(e);
        this.showLoader = false;
      }
    }
    else if (!this.isLogin)
    {
      var user = new Parse.User();
      user.set('username', userInfo.email);
      user.set('email', userInfo.email);
      user.set('password', userInfo.password);
      user.set('trigger', []);
      try {
        await user.signUp().then(() => {
          this.navController.navigateRoot('')
        });
      } catch (error) {
        this.showLoader = false;
        alert("Error: " + error.code + " " + error.message);
      }
    }
  }

  register()
  {
    console.log("coucou");
    if (this.isLogin)
    {
      this.promptLabel = PromptActionLabelLogin.register;
      this.promptLabelButtonTitle = PromptActionButtonTitle.register;
    }
    else if (!this.isLogin)
    {
      this.promptLabel = PromptActionLabelLogin.login;
      this.promptLabelButtonTitle = PromptActionButtonTitle.login;
    }
    this.isLogin = !this.isLogin;
  }
}
