import { Component, OnInit } from '@angular/core';
import {Trigger, TriggerElem} from '../model/Trigger';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, MenuController, NavController} from '@ionic/angular';
import * as Parse                         from 'parse';
import User = Parse.User;
@Component({
  selector: 'app-trigger',
  templateUrl: './trigger.component.html',
  styleUrls: ['./trigger.component.scss'],
})
export class TriggerComponent implements OnInit
{

  serviceID           : string;
  triggerSericeIndex  : number;
  needConnection      : boolean;
  connectionURL       : string;
  triggers            : Trigger[] = [];
  allTriggers         : Trigger[][] = [];
  constructor(
      public router   : Router,
      private route   : ActivatedRoute,
      public navCtrl  : NavController,
      public menuCtrl : MenuController,
      public alertCtrl: AlertController) { }


  ngOnInit()
  {
    this.menuCtrl.isEnabled("true");
    this.serviceID = this.route.snapshot.paramMap.get('id');
    this.getTriggerList().then(() => {
      this.getUserTrigger();
    });
  }

  async getTriggerList()
  {
    const allTrigger = Parse.Object.extend('Services');
    const query = new Parse.Query(allTrigger);
    query.equalTo('objectId', this.serviceID);

    const results = await query.find();

    for (let i = 0; i < results.length; i++)
    {
      var object = results[i];
      let trigger: [TriggerElem] = object.get('trigger');
      this.needConnection = object.get('needConnection');
      this.connectionURL = object.get('callBack');
      for (let y = 0; y < trigger.length; y++)
      {
        let newTrigger: Trigger = {
          objectId: this.serviceID,
          name: trigger[y].name,
          checked: false,
        };
        this.triggers.push(newTrigger);
      }
    }

  }

  async getUserTrigger()
  {
    const currentUser: User = User.current();
    let serviceSet: boolean = false;
    let results: Trigger[][] = currentUser.get('trigger');

    this.allTriggers = results;
    if (results)
    {
      for (let i = 0; i < this.allTriggers.length; i++)
      {
        this.allTriggers[i].forEach((data) =>
        {
          if (data.objectId == this.serviceID)
          {
            serviceSet = true;
            this.triggers = this.allTriggers[i];
            this.triggerSericeIndex = i;
          }
        })
      }
    }
    if (!serviceSet)
    {
      alert('service is not set !');
      this.setUserTrigger();
      this.triggerSericeIndex = 0;
    }
  }

  setUserTrigger()
  {

    const currentUser : User = User.current();
    let newTrigger    : Trigger[][] = currentUser.get('trigger');
    if (!newTrigger)
    {
      newTrigger = [];
    }
    newTrigger.push(this.triggers);
    currentUser.set('trigger', newTrigger);
    currentUser.save().then(() => {

    });
  }

  activeNewTrigger(i: number)
  {
    this.triggers[i].checked = !this.triggers[i].checked;
  }

  saveAllTrigger()
  {
    const currentUser = User.current();
    this.triggers.forEach((data) => {
    });

    this.allTriggers[this.triggerSericeIndex] = this.triggers;
    currentUser.set('trigger', this.allTriggers);
    currentUser.save().then(() => {
      this.navCtrl.navigateForward('service');
    })

  }

}
