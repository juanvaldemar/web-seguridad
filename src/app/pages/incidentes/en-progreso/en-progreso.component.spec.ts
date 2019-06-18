import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnProgresoComponent } from './en-progreso.component';

describe('EnProgresoComponent', () => {
  let component: EnProgresoComponent;
  let fixture: ComponentFixture<EnProgresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnProgresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnProgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
