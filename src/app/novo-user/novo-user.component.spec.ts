import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoUserComponent } from './novo-user.component';

describe('NovoUserComponent', () => {
  let component: NovoUserComponent;
  let fixture: ComponentFixture<NovoUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
