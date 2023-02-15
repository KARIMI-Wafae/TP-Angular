import { CRUDService } from '../services/crud.service';
import { User } from '../list/user.model';
import { Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class store implements OnInit, OnChanges {
  //users: User[] = [];
  varStore !: string;
  currentId !: number;
  max: number = 0;
  protected _users = new BehaviorSubject<any[]>([]);
  public readonly data$ = this._users.asObservable()

  constructor(private crud: CRUDService) {

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

getValue(){
  return this._users.getValue();
}
 getAllUsers() {
  console.log('getallusers');
    return this.crud.getUsers()
      .subscribe((res: User[]) => {
       // this.users=res;
        this._users.next(res);
      })
  }



  postUserInfos(user: User) {
    this.crud.postUser(user)
      .subscribe(res => {
        this._users.next([...this._users.getValue(),res]);
      },
        err => {
          alert("user non ajouté");
        }
      )
  }

  deleteUser(user: User) {
    this.crud.deleteUser(user.id).subscribe(res => {
      let users = this._users.getValue();
      for (let i = 0; i < users.length; i++) {
        if (users[i].id == user.id) {
          users.splice(i, 1);
        }
      }
      this._users.next(users);
    })

  }

  updateUser(user: User) {
    this.crud.updateUser(user, user.id).subscribe(res => {
      let users = this._users.getValue();
      for (let i = 0; i < users.length; i++) {
        if (users[i].id == user.id) {
          users[i] = user;
        }
      }
      this._users.next(users);
    })
  }


}
