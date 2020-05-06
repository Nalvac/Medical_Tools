import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  public etape: number = 1;
  public radio1 = "radio-button-on";
  public radio2 = "radio-button-off";
  public radio3 = "radio-button-off";
  public precedent: boolean = true;
  public suivant: boolean = false;
  public date_naissance: any = "15";
  registerForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private loadCtrl: LoadingController,
    private auth: AuthService, private toastCtrl : ToastController, private alertCtrl : AlertController) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      city: ['', Validators.required],
      adress: ['', Validators.required],
      tel: ['', Validators.required],
      first_last_name : ['', Validators.required],
      tel1 : ['', Validators.required],
      medical_problems : ['', Validators.required],
      allergy_and_reaction : ['', Validators.required],
      treatment : ['', Validators.required],
      blood_group : ['', Validators.required],


    })
  }

  async register() {
    let loading = await this.loadCtrl.create(
      {
        message: "Patientez..."
      }
    )

    loading.present();

    this.auth.signUp(this.registerForm.value).then( async res =>{
      loading.dismiss();

      let toastLoad = await this.toastCtrl.create({
        duration : 3000, 
        message : 'Inscription effectué avec succès'
      });
      toastLoad.present ();
      this.router.navigateByUrl('/connexion');
     
    }, async err =>{
      loading.dismiss();
      let alert = await this.alertCtrl.create({
        header : 'Erreur',
        message : err.message,
        buttons : ['Ok']

      })

      alert.present();
    }
    )

  }


  OuvetapeSui() {
    if (this.etape < 3) {
      this.etape++;
    }
    switch (this.etape) {
      case 1: {
        this.radio1 = "radio-button-on"
        this.radio2 = "radio-button-off"
        this.radio3 = "radio-button-off"

        break;
      }
      case 2: {
        this.radio2 = "radio-button-on"
        this.radio1 = "radio-button-off"
        break;
      }
      case 3: {
        this.radio1 = "radio-button-off"
        this.radio2 = "radio-button-off"
        this.radio3 = "radio-button-on"
        break;
      }
      default: {
        this.etape = 1;
        break;
      }
    }
  }
  OuvetapePre() {
    console.log(this.date_naissance);

    if (this.etape <= 3 && this.etape > 1) {

      this.etape--;

    }
    switch (this.etape) {
      case 1: {
        this.radio1 = "radio-button-on"
        this.radio2 = "radio-button-off"
        this.radio3 = "radio-button-off"

        break;
      }
      case 2: {
        this.radio2 = "radio-button-on"
        this.radio1 = "radio-button-off"
        this.radio3 = "radio-button-off"

        break;
      }
      case 3: {
        this.radio1 = "radio-button-off"
        this.radio2 = "radio-button-off"
        this.radio3 = "radio-button-on"

        break;
      }
      default: {
        this.etape = 1;
        break;
      }
    }
   
  }
  openSignIn(){
    this.router.navigateByUrl('/connexion')
  }





}
