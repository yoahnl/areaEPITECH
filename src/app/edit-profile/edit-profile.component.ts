import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import * as Parse                         from 'parse';
import User = Parse.User;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit
{
  username  : string;
  email     : string;
  firstname : string;
  lastname  : string;

  constructor(public modalController: ModalController) { }

  ngOnInit()
  {
    let user        = User.current();
    this.username   = user.getUsername();
    this.email      = user.getEmail();
    this.firstname  = user.get('firstName');
    this.lastname   = user.get('lastName');
  }

  dismissModal()
  {
    this.modalController.dismiss();
  }

  updateUserInfo()
  {
    let user = User.current();
    console.log(this.username);
    user.setUsername(this.username);
    user.setEmail(this.email);
    user.set('firstName', this.firstname);
    user.set('lastName', this.lastname);

    user.save().then((data) => {
      console.log(data);
      this.modalController.dismiss();
    }, (error) => {
      alert(error);
    })
  }
}
