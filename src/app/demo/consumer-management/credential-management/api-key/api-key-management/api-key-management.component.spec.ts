import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiKeyManagementComponent } from './api-key-management.component';

describe('ApiKeyManagementComponent', () => {
  let component: ApiKeyManagementComponent;
  let fixture: ComponentFixture<ApiKeyManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiKeyManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiKeyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
