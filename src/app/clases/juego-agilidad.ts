import { Juego } from '../clases/juego'

export class JuegoAgilidad extends Juego {
    public primerNumero;
    public operador;
    public segundoNumero;
    public numeroIngresado: number;
    public gano;

    public verificar() {
        return false;
    }
}
