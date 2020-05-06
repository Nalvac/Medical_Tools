import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, LoadingController, AlertController, ToastController } from '@ionic/angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { async } from '@angular/core/testing';

/**
 * Dans le ficher typscript de ma page connexion je gère l'indentification du patient
 * La récupération de toute ses informations de puis firebase
 * Et l'ouverture de la page d'accueil
 */
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
  /**
   * Constructeur avec 6 paramètre
   * toastCtrl : Permet de gérer une notification en bas de pager 
   * storage: Permet de Stocké en locale les données de l'application 
   * router : Outil de navigation 
   * menuCtrl: Permet de controler la page de menu
   * loadCtrl: Permet gérer une attente (exemple : "Patientez...")
   */
  constructor(private toastCtrl : ToastController, private storage: Storage, private router: Router, private menuCtrl: MenuController, private loadCtrl: LoadingController,

    private alertCtrl: AlertController, private auth: AuthService, private fb: FormBuilder) {
    this.menuCtrl.enable(false);
    this.storage.get('userId').then(val => {
      console.log(val);
      this.userId = val;
    })
  }
  /**
   *  Cette fonction permet de vérifier si le mail et le mot de pass sont valide
   * 
   */
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

  }
  /**
   * Dans un fonction on se connecte à la base donnée grâce à l'identifiant du patient et son mot de passe
   * On récupère toutes ses information puis grâce à l'objet storage on sauvergade ses info en locales 
   */
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
  /**
   *  Cette fonction permet de réintialliser son mot de passe en cas d'oublie
   */
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
  /**
   * Permet d'accéder à la page d'inscription afin de créer un compte
   */
  openSignUp() {
    this.router.navigateByUrl('/inscription');

  }

}
