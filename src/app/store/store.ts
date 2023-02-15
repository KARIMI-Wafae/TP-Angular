import { CRUDService } from '../services/crud.service';
import { User } from '../list/user.model';
import { Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class store implements OnInit, OnChanges {
  users: User[] = [];
  varStore !: string;
  currentId !: number;
  max: number = 0;


  constructor(private crud: CRUDService) {
    this.varStore = 'var-store';
  }
  ngOnInit() {


  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  getAllUsers() {
    return this.crud.getUsers()
  }

  getAllUsers2() {
    return this.crud.getUsers()
      .subscribe((res: User[]) => {
        this.users = res;

      })
    this.users = this.users.filter(x => x);
  }

  postUserInfos(user: User) {
    this.crud.postUser(user)
      .subscribe(res => {
        console.log(res);
        alert("user ajouté avec succes");
      },
        err => {
          alert("user non ajouté");
        }
      )
    this.users.push(user);
    this.users = this.users.filter(x => x);
  }

  deleteUser(user: User) {
    this.crud.deleteUser(user.id).subscribe(res => {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id == user.id) {
          this.users.splice(i, 1);
        }
      }
      // this.currentId--;
    })

  }

  updateUser(user: User) {
    this.crud.updateUser(user, user.id).subscribe(res => {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id == user.id) {
          this.users[i] = user;
        }
      }
      this.users = this.users.filter(x => x);
    })
  }

  getIdCourrant() {
    this.crud.getIdCourrant().subscribe((res: Number) => {
      this.currentId = Number(res) + 1;
      console.log(this.currentId);
    });
  }
}
