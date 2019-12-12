import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApiKeyComponent } from './edit-api-key.component';

describe('EditApiKeyComponent', () => {
  let component: EditApiKeyComponent;
  let fixture: ComponentFixture<EditApiKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditApiKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditApiKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
