import { Component } from '@angular/core'; 

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  exports: [
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule
  ]
})
export class MaterialComponent { }
