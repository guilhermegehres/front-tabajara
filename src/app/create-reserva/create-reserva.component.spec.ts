import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReservaComponent } from './create-reserva.component';

describe('CreateReservaComponent', () => {
  let component: CreateReservaComponent;
  let fixture: ComponentFixture<CreateReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
