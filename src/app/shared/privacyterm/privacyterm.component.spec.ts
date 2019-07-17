import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacytermComponent } from './privacyterm.component';

describe('PrivacytermComponent', () => {
  let component: PrivacytermComponent;
  let fixture: ComponentFixture<PrivacytermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacytermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacytermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
