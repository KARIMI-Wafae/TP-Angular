import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoyenneTabComponent } from './moyenne-tab.component';

describe('MoyenneTabComponent', () => {
  let component: MoyenneTabComponent;
  let fixture: ComponentFixture<MoyenneTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoyenneTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoyenneTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
