import { AfterContentInit, AfterViewInit, Component, DoCheck, Input, OnChanges } from '@angular/core';
import { User } from '../list/user.model';
import { store } from '../store/store';

@Component({
  selector: 'app-moyenne-tab',
  templateUrl: './moyenne-tab.component.html',
  styleUrls: ['./moyenne-tab.component.scss']
})
export class MoyenneTabComponent /*implements OnChanges*/ {
  // @Input() users!: User[];
  // @Input() x!: number;
  moyenne: number = 0;


  constructor(public store: store) {

  }

  ngOnInit() {
    this.store.data$.subscribe(
  res => {
   let  somme : number =  0;
    res.forEach(element => {
      if (element.age != null) {
        let age: number = Number(element.age);
        somme += age;
      }
    })
    this.moyenne = Math.trunc(somme / res.length);
  }
    );
  }
  ngOnChanges() {
    /*console.log('moyenne',this.users);
    this.somme = 0;
    this.moyenne = 0;
    this.users.forEach(element => {
      if (element.age != null) {
        let age: number = Number(element.age);
        this.somme += age;
      }
    })
    this.moyenne = Math.trunc(this.somme / this.users.length);*/


  }

}
