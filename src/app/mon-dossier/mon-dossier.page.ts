import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage'
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mon-dossier',
  templateUrl: './mon-dossier.page.html',
  styleUrls: ['./mon-dossier.page.scss'],
})
export class MonDossierPage implements OnInit {
  public nom_Prenom: string;
  public contact: string;
  public taille: string;
  public poids: string;
  public allergie: string;
  public pbM: string;
  public groupSang: String;
  public traitement: String;
  public tel: string;
  public userId: string
  constructor(private loading : LoadingController, private router : Router,private db: AngularFirestore, private alertCtrl: AlertController, private storage: Storage) {

    this.storage.get('userId').then(val => {
      this.userId = val;
    })

  }
  ionViewWillEnter() {
    this.storage.get('Nom_Prenom').then(val => {
      this.nom_Prenom = val
    })
    this.storage.get('Contact').then(val => {
      this.contact = val
    })
    this.storage.get('Taille').then(val => {
      this.taille = val
    })
    this.storage.get('Poids').then(val => {
      this.poids = val
    })
    this.storage.get('Allergie').then(val => {
      this.allergie = val
    })
    this.storage.get('Medical_Problemes').then(val => {
      this.pbM = val
    })
    this.storage.get('Groupe_Sanguin').then(val => {
      this.groupSang = val
    })
    this.storage.get('Traitement').then(val => {
      this.traitement = val
    })
    this.storage.get('Tel1').then(val => {
      this.tel = val
    })
  }

  ngOnInit() {
  }
  ionViewWillEntrer() {
    this.storage.get('Groupe_Sanguin').then(val => {
      this.groupSang = val
    });
    this.storage.get('Allergie').then(val => {
      this.allergie = val
    });
    this.storage.get('Medical_Problemes').then(val => {
      this.pbM = val
    });
    this.storage.get('Taille').then(val => {
      this.taille = val
    });
    this.storage.get('Nom_Prenom').then(val => {
      this.nom_Prenom = val
    });
    this.storage.get('Traitement').then(val => {
      this.traitement = val
    });
    this.storage.get('Tel1').then(val => {
      this.tel = val
    });
    this.storage.get('Poids').then(val => {
      this.poids = val
    });

  }
  async ouvGroup() {
    let prompt = await this.alertCtrl.create({

      header: 'Group Sangun',
      inputs: [
        {
          name: 'groupSang',
          value: this.groupSang,

        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'Cancel'
        },
        {
          text: 'Enregistrer',
          handler: async (data) => {
            let load = await this.loading.create({
              message :'Patientez..'
            })
            load.present();
            console.log('Confirm Okay' + data);
            let updatName = this.db.collection('users').doc(this.userId);
            this.groupSang = data['groupSang'];
            updatName.update({ blood_group: data['groupSang'] }).then(()=>{        
              load.dismiss();
              this.router.navigateByUrl('/tabs/tabs/mon-dossier')
            });
          }
        }


      ]
    })
    prompt.present();
  }
  async ouvTrai() {
    let prompt = await this.alertCtrl.create({

      header: 'Traitement',
      inputs: [
        {
          name: 'title',
          value: this.traitement,

        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'Cancel'
        },
        {
          text: 'Enregistrer',
          handler:  async (data) => {
            let load = await this.loading.create({
              message :'Patientez..'
            })
            load.present();
            let updatName = this.db.collection('users').doc(this.userId);
            this.traitement = data['tite'];
            let updateSingle = updatName.update({ treatment: data['title'] }).then(()=>{
              load.dismiss();
              this.router.navigateByUrl('/tabs/tabs/mon-dossier')
            });

          }
        }


      ]
    })
    prompt.present();
  }
  async ouvAllerg() {
    let prompt = await this.alertCtrl.create({

      header: 'Allergie',
      inputs: [
        {
          name: 'title',
          value: this.allergie,

        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'Cancel'
        },
        {
          text: 'Enregistrer',
          handler:  async (data) => {
            let load = await this.loading.create({
              message :'Patientez..'
            })
            load.present();
            let updatName = this.db.collection('users').doc(this.userId);
            this.allergie = data['title'];
            let updateSingle = updatName.update({ allergy_and_reaction: data['title'] }).then(()=>{
              load.dismiss();
              this.router.navigateByUrl('/tabs/tabs/mon-dossier')
            });

          }
        }


      ]
    })
    prompt.present();
  }

  async ouvPbM() {
    let prompt = await this.alertCtrl.create({

      header: 'Problémes medicaux',
      inputs: [
        {
          name: 'title',
          value: this.pbM,

        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'Cancel'
        },
        {
          text: 'Enregistrer',
          handler: async (data) => {
            let load = await this.loading.create({
              message :'Patientez..'
            })
            load.present();
            let updatName = this.db.collection('users').doc(this.userId);
            this.pbM = data['title'];
            let updateSingle = updatName.update({ medical_problems: data['title'] }).then(()=>{
              load.dismiss();            
              this.router.navigateByUrl('/tabs/tabs/mon-dossier')
            });
          }
        }


      ]
    })
    prompt.present();
  }
  async ouvTaille() {
    let prompt = await this.alertCtrl.create({

      header: 'Taille',
      inputs: [
        {
          name: 'title',
          value: this.taille,

        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'Cancel'
        },
        {
          text: 'Enregistrer',
          handler: async (data) => {
            let load = await this.loading.create({
              message :'Patientez..'
            })
            load.present();
            let updatName = this.db.collection('users').doc(this.userId);
            this.taille = data['title'];
            let updateSingle = updatName.update({ height: data['title'] }).then(()=>{
              load.dismiss();            
              this.router.navigateByUrl('/tabs/tabs/mon-dossier')
            });
          }
        }


      ]
    })
    prompt.present();
  }
  async ouvPoid() {
    let prompt = await this.alertCtrl.create({

      header: 'Poids',
      inputs: [
        {
          name: 'title',
          value: this.poids,

        },

      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'Cancel'
        },
        {
          text: 'Enregistrer',
          handler:  async (data) => {
            let load = await this.loading.create({
              message :'Patientez..'
            })
            load.present();
            let updatName = this.db.collection('users').doc(this.userId);
            this.poids = data['title'];
            let updateSingle = updatName.update({ weight: data['title'] }).then(()=>{
              load.dismiss();             
              this.router.navigateByUrl('/tabs/tabs/mon-dossier') 
            });         
          }
        }


      ]
    })
    prompt.present();
  }
  async ouvCU() {
    let prompt = await this.alertCtrl.create({

      header: 'Contact en cas d\'urgence',
      inputs: [
        {
          name: 'nom_prenom',
          value: this.nom_Prenom,

        },
        {
          name: 'tel',
          value: this.tel,

        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'Cancel'
        },
        {
          text: 'Enregistrer',
          handler:  async (data) => {
            let load = await this.loading.create({
              message :'Patientez..'
            })
            load.present();
            let updatName = this.db.collection('users').doc(this.userId);
            this.nom_Prenom = data['nom_prenom'];
            this.tel = data['tel']
            let updateSingle = updatName.update({ first_last_name: data['nom_prenom'] }).then(()=>{
              load.dismiss();            
              this.router.navigateByUrl('/tabs/tabs/mon-dossier')
            });
            let updateSinglee = updatName.update({ tel1: data['tel'] }).then(()=>{
              load.dismiss();            
              this.router.navigateByUrl('/tabs/tabs/mon-dossier')
            });

          }
        }


      ]
    })
    prompt.present();
  }

}
