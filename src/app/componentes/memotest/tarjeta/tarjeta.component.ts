import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent {

  @Input() value: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
  
}
