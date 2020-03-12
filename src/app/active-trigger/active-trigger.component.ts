import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModalController} from '@ionic/angular';
import {TriggerElem} from '../model/Trigger';
import * as Parse                         from 'parse';
@Component({
  selector: 'app-active-trigger',
  templateUrl: './active-trigger.component.html',
  styleUrls: ['./active-trigger.component.scss'],
})
export class ActiveTriggerComponent implements OnInit
{

  @Input("objectID") objectID       : string;
  @Input("TriggerName") TriggerName : string;
  urlToCall                         : string;
  serviceName                       : string;
  message                           : string;
  isButton                          : boolean;
  isText                            : boolean;
  thisTrigger                       : TriggerElem;

  constructor(
      public modalCtrl: ModalController,
      public http     : HttpClient)
  { }


  ngOnInit()
  {
    console.log(this.objectID);
    console.log(this.TriggerName);
    this.getTriggerInfo();
  }

  dismissModal()
  {
    this.modalCtrl.dismiss();
  }

  async getTriggerInfo()
  {
    const service = Parse.Object.extend("Services");
    const query = new Parse.Query(service);
    query.equalTo("objectId", this.objectID);
    const results = await query.find();
    let triggers: TriggerElem[];
    for (let object of results)
    {
      console.log(object);
      this.serviceName = object.get('Name');
      triggers = object.get('trigger');
    }

    for (let trigger of triggers)
    {
      console.log(trigger);
      console.log(this.TriggerName);
      if (trigger.name == this.TriggerName)
      {
        this.thisTrigger = trigger;
        this.urlToCall = this.thisTrigger.url;
      }
    }
    console.log(this.thisTrigger);
    switch (this.thisTrigger.type)
    {
      case "text":
        this.isText = true;
        break;
      case "button":
        this.isButton = true;
        break;
    }


  }

  sendMessage()
  {
    let body;
    this.http.post(this.urlToCall, body, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'data': this.message
      }
    }).subscribe((res) =>{
      this.modalCtrl.dismiss();
    });
  }
}
