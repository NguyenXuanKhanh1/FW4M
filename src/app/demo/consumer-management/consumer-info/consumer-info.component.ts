import { Component, OnInit } from '@angular/core';
import { ConsumerManagementService } from '../consumer-management.service';
import { ConsumerSearchRequest } from '../consumer.model';

@Component({
  selector: 'app-consumer-info',
  templateUrl: './consumer-info.component.html',
  styleUrls: ['./consumer-info.component.scss']
})
export class ConsumerInfoComponent implements OnInit {
  public input: any
  constructor(
    private _consumerService: ConsumerManagementService
  ) { }

  ngOnInit() {
    this._consumerService.searchDetail(new ConsumerSearchRequest({})).subscribe((res: any) => {
      console.log(res.data)
    })
  }

}
