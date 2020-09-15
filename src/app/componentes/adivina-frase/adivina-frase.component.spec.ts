import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdivinaFraseComponent } from './adivina-frase.component';

describe('AdivinaFraseComponent', () => {
  let component: AdivinaFraseComponent;
  let fixture: ComponentFixture<AdivinaFraseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdivinaFraseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdivinaFraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
