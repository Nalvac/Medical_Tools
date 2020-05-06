import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  public Nom: string;
  public Email: string;
  public Ville: string;
  public Prenom: string;
  public Telephone: string;
  public Adresse: string;
  public CodePostal: string;
  public mail: string;
  public userId: string;
  myImage = "../../assets/imgs/blood_medical.png";

  constructor(private router: Router, private loading: LoadingController, private db: AngularFirestore, private camera: Camera, private alertCtrl: AlertController, private menuCtrl: MenuController, public storage: Storage) {
    this.menuCtrl.enable(true);
    this.storage.get('userId').then(val => {
      this.userId = val;
    })
  }
  ionViewWillEnter() {
    this.storage.get('Nom').then(val => {
      this.Nom = val
    })
    this.storage.get('Prenom').then(val => {
      this.Prenom = val
    })
    this.storage.get('Tel').then(val => {
      this.Telephone = val
    })
    this.storage.get('Ville').then(val => {
      this.Ville = val
    })
    this.storage.get('Adresse').then(val => {
      this.Adresse = val
    })
    this.storage.get('mail').then(val => {
      this.mail = val
    })
  }
  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.myImage = base64Image;
    }, (err) => {
      // Handle error
    });
  }

  ngOnInit() {

  }
  async  modifiNom() {
    let prompt = await this.alertCtrl.create({

      header: 'Nom',
      inputs: [
        {
          name: 'title',
          value: this.Nom,
          placeholder: 'Votre Nom'
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
              message: 'Patientez..'
            })
            load.present();
            let updatName = this.db.collection('users').doc(this.userId);
            this.Nom = data['title'];
            let updateSingle = updatName.update({ first_name: data['title'] }).then(()=>{
              load.dismiss();      
              this.router.navigateByUrl('/tabs/tabs/profil');
             
            });
           
          }
        }


      ]
    })
    prompt.present();
  }

  async  modifiPrenom() {
    let prompt = await this.alertCtrl.create({

      header: 'Prenom',
      inputs: [
        {
          name: 'title',
          value: this.Prenom,
          placeholder: 'Votre Prenom'
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
              message: 'Patientez..'
            })
            load.present()
            let updatName = this.db.collection('users').doc(this.userId);
            this.Prenom = data['title'];
            let updateSingle = updatName.update({ last_name: data['title'] }).then(()=>{
              load.dismiss();            
              this.router.navigateByUrl('/tabs/tabs/profil')
            });
 
          }
        }


      ]
    })
    prompt.present();
  }
  async  modifiVille() {
    let prompt = await this.alertCtrl.create({

      header: 'Ville',
      inputs: [
        {
          name: 'title',
          value: this.Ville,
          placeholder: 'Votre ville'
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
              message: 'Patientez..'
            })
            load.present()
            let updatName = this.db.collection('users').doc(this.userId);
            this.Ville = data['title'];
            let updateSingle = updatName.update({ adress: data['title'] }).then(()=>{
              load.dismiss();            
              this.router.navigateByUrl('/tabs/tabs/profil')
            });
          }
        }


      ]
    })
    prompt.present();
  }
  async  modifiAdresse() {
    let prompt = await this.alertCtrl.create({

      header: 'Adresse',
      inputs: [
        {
          name: 'title',
          value: this.Adresse,
          placeholder: 'Votre adresse'
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
              message: 'Patientez..'
            })
            load.present()
            let updatName = this.db.collection('users').doc(this.userId);
            this.Adresse = data['title'];
            let updateSingle = updatName.update({ adress: data['title'] }).then(()=>{
              load.dismiss();            
              this.router.navigateByUrl('/tabs/tabs/profil')
            });

          }
        }


      ]
    })
    prompt.present();
  }
  async  modifCodePostal() {
    let prompt = await this.alertCtrl.create({

      header: 'Code Postal',
      inputs: [
        {
          name: 'title',
          value: this.CodePostal,
          placeholder: 'Code Postal'
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
              message: 'Patientez..'
            })
            load.present()
            let updatName = this.db.collection('users').doc(this.userId);
            this.CodePostal = data['title'];
            let updateSingle = updatName.update({ adress: data['title'] }).then(()=>{
              load.dismiss();            
              this.router.navigateByUrl('/tabs/tabs/profil');
            });
          }
        }


      ]
    })
    prompt.present();

  }
  async  modifitel() {
    let prompt = await this.alertCtrl.create({

      header: 'Téléphone',
      inputs: [
        {
          name: 'title',
          value: this.Telephone,
          placeholder: 'Votre Numéro'
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
              message: 'Patientez..'
            })
            load.present()
            let updatName = this.db.collection('users').doc(this.userId);
            this.Telephone = data['title'];
            let updateSingle = updatName.update({ tel: data['title'] }).then(()=>{
              load.dismiss();            
              this.router.navigateByUrl('/tabs/tabs/profil')
            });
          }
        }


      ]
    })
    prompt.present();
  }
  async  modifiMail() {
    let prompt = await this.alertCtrl.create({

      header: 'Mail',
      inputs: [
        {
          name: 'title',
          value: this.mail,
          placeholder: 'Votre Mail'
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
              message: 'Patientez..'
            })
            load.present()
            let updatName = this.db.collection('users').doc(this.userId);
            this.mail = data['title'];
            updatName.update({ email: data['title'] }).then(()=>{
              load.dismiss();            
              this.router.navigateByUrl('/tabs/tabs/profil')
            });
          }
        }


      ]
    })
    prompt.present();
  }







}
