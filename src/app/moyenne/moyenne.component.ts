import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-moyenne',
  templateUrl: './moyenne.component.html',
  styleUrls: ['./moyenne.component.scss']
})
export class MoyenneComponent implements OnInit {
  @Input() moyenne!: number;
  constructor() {

  }
  ngOnInit() {


  }
}
