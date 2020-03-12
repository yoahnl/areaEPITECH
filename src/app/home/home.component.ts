import {Component, Input, OnInit} from '@angular/core';
import * as Parse                         from 'parse';
import {MenuController, ModalController, NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Trigger, TriggerElem} from '../model/Trigger';
import {ActiveTriggerComponent} from '../active-trigger/active-trigger.component';
import User = Parse.User;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit
{

  triggers      : Trigger[][];
  listOfTriggers: TriggerList[] = [];
  hasReloaded   : boolean = false;
  showLoader    : boolean = true;
  constructor(
      private navController : NavController,
      public menuCtrl       : MenuController,
      public modalCtrl      : ModalController
  ) {}

  ngOnInit(): void
  {
    if (this.hasReloaded)
    {
      this.hasReloaded = true;
      document.location.reload();
    }
  }

  ionViewWillEnter()
  {
    this.triggers       = [];
    this.listOfTriggers = [];
    const currentUser = User.current();
    if (!currentUser)
    {
      this.navController.navigateRoot('/login');
    }
    else
    {
      this.getAllTriger();
    }
  }

  async getAllTriger()
  {
    const currentUser     = User.current();
    let indexList: number = 0;
    this.triggers = currentUser.get('trigger');
    let isUsed: boolean = false;
    if (this.triggers)
    {
      for (const trigger of this.triggers)
      {
        const service = Parse.Object.extend("Services");
        const query = new Parse.Query(service);

        query.equalTo("objectId", trigger[0].objectId);
        // @ts-ignore
        const results = await query.find();
        let name    : string;
        let logo    : string;
        let objectId: string;
        for (let i = 0; i < results.length; i++) {
          var object = results[i];
          name     = object.get('Name');
          logo     = object.get('Logo');
          objectId = object.id
        }
        for (let elem of trigger)
        {
          if (elem.checked)
          {
            isUsed = true;
          }

        }

        this.listOfTriggers.push({
          name    : name,
          logo    : logo,
          objectid: objectId,
          triggers: trigger,
          isUsed  : isUsed,
        });
        isUsed = false;
      }
      this.showLoader = false;
    }
  }

  async activeTrigger(objectId: string, name: string)
  {
    let showModal : boolean = false;
    let callURL   : string;
    const service = Parse.Object.extend("Services");
    const query = new Parse.Query(service);

    query.equalTo("objectId", objectId);
    const results = await query.find();

    for (let object of results)
    {
      showModal = object.get('needConnection');
    }

    if (showModal)
    {
      const modal = await this.modalCtrl.create({
        component: ActiveTriggerComponent,
        componentProps: {
          objectID        : objectId,
          TriggerName     : name
        }
      });
      return await modal.present().then(() => {

      });
    }
  }
}

interface TriggerList
{
  objectid: string;
  logo    : string;
  name    : string;
  isUsed  : boolean;
  triggers: Trigger[];
}
