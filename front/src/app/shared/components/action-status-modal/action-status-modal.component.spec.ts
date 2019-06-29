import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionStatusModalComponent } from './action-status-modal.component';

describe('ActionStatusModalComponent', () => {
  let component: ActionStatusModalComponent;
  let fixture: ComponentFixture<ActionStatusModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionStatusModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
