import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;
  userId : string;

  constructor(private storage : Storage, private afAuth: AngularFireAuth, private db: AngularFirestore, private navCtrl: NavController) {
    this.storage.get('userId').then(val=>{
      this.userId = val;
    })
  
  }

  signIn(credentials): Observable<any> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)).pipe(
      switchMap(user => {
        console.log('real user: ', user);
        if (user) {
          this.storage.set('userId', user.user.uid)
          return this.db.doc(`users/${user.user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  signUp (credentials){
    
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email , credentials.password).then(data =>{
      return this.db.doc(`users/${data.user.uid}`).set({
        first_name : credentials.first_name,
        last_name : credentials.last_name,
        weight: credentials.weight,
        height: credentials.height,
        city: credentials.city,
        adress: credentials.adress,
        tel: credentials.tel,
        first_last_name : credentials.first_last_name,
        tel1 : credentials.tel1,
        medical_problems : credentials.medical_problems,
        allergy_and_reaction : credentials.allergy_and_reaction,
        treatment : credentials.treatment,
        blood_group : credentials.blood_group,        
        email : data.user.email,
        role : 'USER',
        permissions : [],
        created : firebase.firestore.FieldValue.serverTimestamp()
      })
    })

  }

resetPw(mail){
  return this.afAuth.auth.sendPasswordResetEmail(mail);
}

deleteRdv(ud){
 
}

update_group ( value: any){

  let update = this.db.collection('users').doc(this.userId)

  update.update({blood_group : value})
}

 
}
