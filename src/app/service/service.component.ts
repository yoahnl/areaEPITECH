import { Component, OnInit        } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Router                   } from '@angular/router';
import { Service                  } from '../model/service';
import * as Parse                   from 'parse';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit
{

  services    : Service[] = [];
  showLoader  : boolean = true;

  constructor(public navCtrl: NavController, public router: Router) { }

  ngOnInit()
  {
    this.getAllServices();
  }

  async getAllServices()
  {
    const GameScore = Parse.Object.extend('Services');
    const query = new Parse.Query(GameScore);
    const results = await query.find();
    for (let i = 0; i < results.length; i++)
    {
      var object = results[i];
      var newService: Service = {
        objectId: object.id,
        name: object.get('Name'),
        logo: object.get('Logo'),
        description: ''
      };
      this.services.push(newService);
    }
    this.showLoader = false;
  }

  toAddTriggerPage(service: Service)
  {
    this.router.navigate(['trigger', { id: service.objectId}]);
  }
}
