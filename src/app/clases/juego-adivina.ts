import { Juego } from '../clases/juego'
import { FirebaseService } from '../servicios/firebase.service';

export class JuegoAdivina extends  Juego {
    numeroSecreto: number = 0;
    numeroIngresado = 0;
    constructor(private firebaseService: FirebaseService,
      nombre?: string, gano?: boolean, jugador?:string) {
        super("Adivina el número",gano,jugador);
     
    
      
      }
    public verificar() {
        if (this.numeroIngresado == this.numeroSecreto) {
          this.gano = true;
        }
        if (this.gano) {
          this.firebaseService.saveResult('Adivina', true);
          return true;
        } else {
          this.firebaseService.saveResult('Adivina', false);
          return false;
        }
     }
     public generarnumero() {
        this.numeroSecreto = Math.floor((Math.random() * 100) + 1);
        console.info('numero Secreto:' + this.numeroSecreto);
        this.gano = false;
      }
      public retornarAyuda() {
        if (this.numeroIngresado < this.numeroSecreto) {
          return "Falta";
        }
        return "Te pasate";
      }
}
