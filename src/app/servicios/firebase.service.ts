import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Jugador } from '../clases/jugador';
import { Router } from '@angular/router';


import * as firebase from "firebase/app";

import {environment} from '../../environments/environment';

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public router: Router) { }

  user = null;

  db = firebase.firestore();

  nuevoJugador(jugador: Jugador) {
    var router = this.router;
    var dbRef = this.db;

    firebase.auth().createUserWithEmailAndPassword(jugador.mail, jugador.contraseña)
    .then(function(credencial) {
      dbRef.collection('jugadores').add({
        uid: credencial.user.uid,
        nombre: jugador.nombre,
        apellido: jugador.apellido,
        mail: jugador.mail,
        contraseña: jugador.contraseña,
        rol: jugador.rol,
        wins: 0,
        losses: 0
      })
      .then(function (docRef) {
        console.log("Bien")
      });
      credencial.user.getIdToken()
        .then(function (token) {
        localStorage.setItem('token', token);
        router.navigate(['/Login']);
      });
    })
    .catch(function (error) {
      console.error("Error: ", error);
    });
  }

  loginJugador(email: string, pass: string) {
    var router = this.router;
    var dbRef = this.db;

    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(function (credential) {
      console.log(credential);
      dbRef.collection("jugadores")
      .where("uid", "==", credential.user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        console.log(doc.data());
        credential.user.getIdToken()
          .then(function (token) {
            
            console.log("Bien")
            
            localStorage.setItem('token', token);
            router.navigate(['/Principal']);
          });
        });
      });
    })
    .catch(function (error) {
      console.error("Error: ", error);
    });
    
  }

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
}
