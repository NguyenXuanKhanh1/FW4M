import { Component, OnInit, Input } from '@angular/core';
import { GroupViewModel, ConsumerViewModel } from '../consumer.model';

@Component({
	selector: 'app-optional',
	templateUrl: './optional-consumer.component.html',
	styleUrls: ['./optional-consumer.component.scss']
})
export class OptionalConsumerComponent implements OnInit {
	@Input() public item = new ConsumerViewModel();
	constructor() { }

	ngOnInit() {
	}

}
