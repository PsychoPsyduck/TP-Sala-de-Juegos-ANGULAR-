import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Jugador } from '../clases/jugador';
import { Router } from '@angular/router';


import * as firebase from "firebase/app";

import {environment} from '../../environments/environment';

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

//new era
// import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
// import { Router } from '@angular/router';
// import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public router: Router, 
              private AFauth: AngularFireAuth
              ) { }

  user = null;

  db = firebase.firestore();

  isAuthenticated() {
    return localStorage.getItem("token");
  }

  logoutJugador() {
    var router = this.router;

    localStorage.removeItem('token');
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      console.log("Bien")
      router.navigate(['/Login']);
    }).catch(function (error) {
      console.error("Error: ", error);
    });
  }

  async resetResult(juego) {
    await this.getCurrentUser();
    var db = firebase.firestore();
    let resultados = db.collection('resultados')
    let activeRef = await resultados
      .where('usuarioId', '==', this.user.uid)
      .where('juego', '==', juego)
      .get();

      //update
      activeRef.docs.forEach(function (doc) {
        let wins = 0;
        let losses = 0;
        db.collection("resultados").doc(doc.id)
          .update({ wins: wins, losses: losses });
      });
  }

  async saveResult(juego, gano) {
    await this.getCurrentUser();
    var db = firebase.firestore();
    let resultados = db.collection('resultados')
    
    let activeRef = await resultados
      .where('usuarioId', '==', this.user.uid)
      .where('juego', '==', juego)
      .get();

    if (activeRef.empty) {
      //add
      db.collection("resultados").add({
        usuarioId: this.user.uid,
        juego: juego,
        wins: gano ? 1 : 0,
        losses: gano ? 0 : 1
      });
    }
    else {
      //update
      activeRef.docs.forEach(function (doc) {
        let wins = doc.data().wins + (gano ? 1 : 0);
        let losses = doc.data().losses + (gano ? 0 : 1);
        db.collection("resultados").doc(doc.id)
          .update({ wins: wins, losses: losses });
      });
    }
  }

  async getCurrentUser() {
    firebase.auth().onAuthStateChanged(async user => {
      this.user = user;
    });
  }

  async getUsers() {
    let usrsRef = await this.db.collection('jugadores').get();
    return usrsRef;
  }

  async getResultados() {
    let resultados = await this.db.collection('resultados').get();
    return resultados;
  }

  //new era
  // getCurrentUser() {
  //   let user = this.AFauth.currentUser;
  //   console.log(user);
  //   return user;
  // }

  register(jugador: Jugador) {
    return new Promise((resolve, reject) => {
      this.AFauth.createUserWithEmailAndPassword(jugador.mail, jugador.contraseña)
        .then(res => {
          console.log(res.user.uid);
          const uid = res.user.uid;
          this.db.collection("jugadores").doc(res.user.uid).set({
            uid: uid,
            nombre: jugador.nombre,
            apellido: jugador.apellido,
            mail: jugador.mail,
            contraseña: jugador.contraseña,
            rol: jugador.rol,
            wins: 0,
            losses: 0
          })
          resolve(res)
        })
        .catch(error => { reject(error) });
    });
  }

  login(email: string, password: string) {

    return new Promise((resolve, reject) => {
      this.AFauth.signInWithEmailAndPassword(email, password)
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    })
  }

  logout() {
    this.AFauth.signOut().then(() => {
      this.router.navigate(['/Login']);
    })
  }
}
