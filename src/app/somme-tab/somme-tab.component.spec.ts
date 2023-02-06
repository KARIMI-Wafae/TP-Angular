import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SommeTabComponent } from './somme-tab.component';

describe('SommeTabComponent', () => {
  let component: SommeTabComponent;
  let fixture: ComponentFixture<SommeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SommeTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SommeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
