import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportConsumerComponent } from './import-consumer.component';

describe('ImportConsumerComponent', () => {
	let component: ImportConsumerComponent;
	let fixture: ComponentFixture<ImportConsumerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ImportConsumerComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ImportConsumerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
