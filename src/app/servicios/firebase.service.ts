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
        this.router.navigate(['/Login']);
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

  logoutJugador() {
    localStorage.removeItem('token');
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  }
}
