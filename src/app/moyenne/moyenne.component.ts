import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-moyenne',
  templateUrl: './moyenne.component.html',
  styleUrls: ['./moyenne.component.scss']
})
export class MoyenneComponent implements OnInit {
  @Input() listUsers: any;
  constructor() {
    //
  }
  ngOnInit() {

  }
}
