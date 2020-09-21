import { Component, OnInit } from '@angular/core';
import {AlertserviceService} from '../alertservice.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  AlertList: any = [];
  constructor(public alertservice: AlertserviceService) { }

  ngOnInit() {
  }

  
}
