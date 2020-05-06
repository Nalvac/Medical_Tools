import { Component, OnInit , ViewChild} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AlertController, LoadingController } from '@ionic/angular';
import { async } from '@angular/core/testing';
registerLocaleData(localeFr);
@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.page.html',
  styleUrls: ['./rdv.page.scss'],
})

export class RDVPage implements OnInit {
  @ViewChild (CalendarComponent, {static : false}) myCalendar: CalendarComponent;
  minDate = new Date().toISOString();
  showEvent : boolean = true;
  title 
  eventSource = [];
  newEvent = {
    title :'',
    startTime : '',
    endTime : ''
  }
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale :'fr-Fr'
  };
  selectedDate = new Date();
  
  constructor(private load :LoadingController, private db: AngularFirestore,private alertCtrl : AlertController) {
    this.db.collection(`events`).snapshotChanges().subscribe(colSnap => {
      this.eventSource = [];
      colSnap.forEach(snap => {
        let event:any = snap.payload.doc.data();
        event.id = snap.payload.doc.id;
        event.startTime = event.startTime.toDate();
        event.endTime = event.endTime.toDate();
        console.log(event);
        this.eventSource.push(event);
      
      });
    });
  }

  addNewEvent() {
    let start = this.selectedDate;
    let end = new Date (this.newEvent.endTime);
   
    let event = {
      title: this.newEvent.title,
      startTime: start,
      endTime: end,
      allDay: false,
    };
  
    this.db.collection(`events`).add(event);
    this.ouvrForms();
  }

  onViewTitleChanged(title) {
    console.log(title);
    let start = new Date(this.newEvent.startTime) ;
    let end = new Date (this.newEvent.endTime);
   
    let event = {
      title: this.newEvent.title,
      startTime: start,
      endTime: end,
      allDay: false,
    };
    this.title = title;
    
  }

  async onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    let id =  JSON.stringify(event['id']);
    console.log(id.substring(1,21));
    let alert = await this.alertCtrl.create(
      {
        header : 'Voulez vous supprimer ce rendez-vous',
        buttons : [
          { text : 'Annuler',
            role :'cancel'
          },
          {
            text : 'Confirmer',
            handler : async () =>{
              let laoding = await this.load.create({
                message :' Patientez'
              })
              laoding.present();

              this.db.doc(`events/${id.substring(1,21)}`).delete().then(()=>{
                laoding.dismiss();
              })

            }
          }
      ]
      }
    )
    alert.present(); 
  }

  async onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.selectedDate = ev.selectedTime; 
    const selected = new Date(ev.selectedTime);
    this.newEvent.startTime = selected.toISOString();
 
  }

  onCurrentDateChanged(event: Date) {
    console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }


    

  
  ouvrForms(){
    this.showEvent = !this.showEvent;
     
  }

  


  ngOnInit() {
  }

}
