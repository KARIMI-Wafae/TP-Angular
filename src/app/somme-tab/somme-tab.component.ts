import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { empty } from 'rxjs';
import { User } from '../list/user.model';

@Component({
  selector: 'app-somme-tab',
  templateUrl: './somme-tab.component.html',
  styleUrls: ['./somme-tab.component.scss']
})
export class SommeTabComponent implements OnInit, OnChanges {
  @Input() users!: User[];
  somme: number = 0;
  constructor() {
    // console.log('constructor-somme')
  }

  ngOnInit() {
    // console.log('oninit-somme');

  }
  ngOnChanges() {
    this.somme = 0;
    //console.log('somme', this.users)
    this.users.forEach(element => {
      if (element.age != null) {
        let age: number = Number(element.age);
        this.somme += age;
      }
    })
  }
}
