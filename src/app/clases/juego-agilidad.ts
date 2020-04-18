import { Juego } from '../clases/juego'

export class JuegoAgilidad extends Juego {
    public numeroIngresado;
    public gano;

    public verificar() {
        return false;
    }
}
