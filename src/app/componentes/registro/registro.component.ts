import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

 /* constructor( private miConstructor:FormBuilder) { }
  email=new FormControl('',[Validators.email]);
  formRegistro:FormGroup=this.miConstructor.group({
    usuario:this.email
  });*/
  
  usuario = '';
  clave= '';
  repitaClave= '';
  terminosCondiciones: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
  }

  Registrar() {
    if (this.clave === this.repitaClave && this.terminosCondiciones == true) {
      this.router.navigate(['/Principal']);
    }
  }
}
