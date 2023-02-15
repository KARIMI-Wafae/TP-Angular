import { AfterContentInit, AfterViewInit, Component, DoCheck, Input, OnChanges } from '@angular/core';
import { User } from '../list/user.model';

@Component({
  selector: 'app-moyenne-tab',
  templateUrl: './moyenne-tab.component.html',
  styleUrls: ['./moyenne-tab.component.scss']
})
export class MoyenneTabComponent implements OnChanges {
  @Input() users!: User[];
  @Input() x!: number;
  moyenne: number = 0;
  somme: number = 0;
  constructor() {
    // console.log('constructor-somme')
  }

  ngOnInit() {
    // console.log('oninit-somme');

  }
  ngOnChanges() {
    this.somme = 0;
    this.moyenne = 0;
    this.users.forEach(element => {
      if (element.age != null) {
        let age: number = Number(element.age);
        this.somme += age;
      }
    })
    this.moyenne = Math.trunc(this.somme / this.users.length);

  }

}
