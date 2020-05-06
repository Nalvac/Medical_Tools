import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, LoadingController, AlertController, ToastController } from '@ionic/angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  loginForm: FormGroup;
  mainuser: any;
  sub: any
  public userId : string;
  constructor(private toastCtrl : ToastController, private db: AngularFirestore, private storage: Storage, private router: Router, private menuCtrl: MenuController, private loadCtrl: LoadingController,

    private alertCtrl: AlertController, private auth: AuthService, private fb: FormBuilder) {
    this.menuCtrl.enable(false);
    this.storage.get('userId').then(val => {
      console.log(val);
      this.userId = val;
    })
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

  }
  async openHome() {
   if (this.userId != ""){
    let load = await this.loadCtrl.create(
      {
        message: "Patientez..."
      }
    )
    load.present();

    this.auth.signIn(this.loginForm.value).subscribe(data => {
      load.dismiss();
      console.log('User: ', data);
      this.storage.set('Nom', data['first_name']);
      this.storage.set('Prenom', data['last_name']);
      this.storage.set('Ville', data['city']);
      this.storage.set('Adresse', data['adress']);
      this.storage.set('Allergie', data['allergy_and_reaction']);
      this.storage.set('Groupe_Sanguin', data['blood_group']);
      this.storage.set('mail', data['email']);
      this.storage.set('Poids', data['weight']);
      this.storage.set('Taille', data['height']);
      this.storage.set('Tel', data['tel']);
      this.storage.set('Tel1', data['tel1']);
      this.storage.set('Nom_Prenom', data['first_last_name']);
      this.storage.set('Traitement', data['treatment']);
      this.storage.set('Medical_Problemes', data['medical_problems']);
    
      this.router.navigateByUrl('/tabs');
      this.menuCtrl.enable(true);
    }, async err => {
      load.dismiss()
      let alert = await this.alertCtrl.create({
        header: 'Erreur',
        message: err.message,
        buttons: ['Ok']
      })

      alert.present()
    }
    )
  }else{
    this.router.navigateByUrl('/tabs');
  }
  }
  async onpenReset() {
    let mail;
    let alert = await this.alertCtrl.create(
      {
        header: " Mot de passe oublié ?",
        inputs :[{
          name : 'mail',
          placeholder : "Entrer votre mail"
        }],
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel'
          },
          {
            text : 'Ok',
            handler : (data)=>{
              console.log(data);
              this.resetPassWord(data['mail'])
            }
          }
        ]

      })
      

      alert.present();
  }
  resetPassWord(mail){
    this.auth.resetPw(mail).then(async res=>{
      let toast = await this.toastCtrl.create(
        {
          duration : 3000,
          message : 'Succès! Vérifiez vos e-mails pour plus d\'informations.'
        }
      )
        toast.present();
    }, async error =>{
      let alert = await this.alertCtrl.create({
        header :'Erreur',
        message : error.message,
        buttons : ['Ok']
      })
      alert.present();
    }
    
    )
  }
  openSignUp() {
    this.router.navigateByUrl('/inscription');

  }

}
