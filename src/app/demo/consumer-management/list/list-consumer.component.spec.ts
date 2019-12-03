import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsumerComponent } from './list-consumer.component';

describe('ListConsumerComponent', () => {
  let component: ListConsumerComponent;
  let fixture: ComponentFixture<ListConsumerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConsumerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
