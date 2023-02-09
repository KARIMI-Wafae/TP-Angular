import { CRUDService } from '../services/crud.service';
import { User } from '../list/user.model';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class store implements OnInit{
  users: User[]=[];
  varStore !: string ;
  currentId !: number;


  constructor(private crud: CRUDService) {
    this.varStore='var-store';
  }
    ngOnInit(){

    }
  getAllUsers() {
    this.crud.getUsers().subscribe((res: User[]) => {
      this.users = res;
     // this.currentId= res.length;
       console.log('list-getusers-store');
    })
  }

  postUserInfos(user : User) {
   // this.getIdCourrant();
    this.crud.postUser(user)
      .subscribe(res => {
        console.log(res);
      //  alert("user ajouté avec succes");
      },
        err => {
          alert("user non ajouté");
        }
      )
    this.users.push(user);
    this.users = this.users.filter(x => x);
  }

}
