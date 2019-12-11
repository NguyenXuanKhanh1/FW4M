import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerInfoComponent } from './consumer-info.component';

describe('ConsumerInfoComponent', () => {
  let component: ConsumerInfoComponent;
  let fixture: ComponentFixture<ConsumerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
