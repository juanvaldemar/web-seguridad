import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResueltosComponent } from './resueltos.component';

describe('ResueltosComponent', () => {
  let component: ResueltosComponent;
  let fixture: ComponentFixture<ResueltosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResueltosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResueltosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
