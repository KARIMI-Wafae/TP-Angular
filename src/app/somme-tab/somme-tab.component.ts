import { Component, Input, OnInit } from '@angular/core';
import { empty } from 'rxjs';
import { User } from '../list/user.model';

@Component({
  selector: 'app-somme-tab',
  templateUrl: './somme-tab.component.html',
  styleUrls: ['./somme-tab.component.scss']
})
export class SommeTabComponent implements OnInit{
  @Input() users !: User[];
  somme : number= 0;
  ngOnInit(){
   // this.somme=0;
    this.users.forEach(element => {
      if(element.age != null){
        let age : number= Number(element.age);
          this.somme+=age;
      }
    })
  }
}
