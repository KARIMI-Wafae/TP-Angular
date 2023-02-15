import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, max } from 'rxjs/operators';
import { User } from '../list/user.model';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {
  idCourrant: number = 0;
  constructor(private http: HttpClient) { }

  postUser(user: User) {
    return this.http.post<User>("http://localhost:3000/posts/", user)
     .pipe(map((res: User) => {
       return res;
     }))
  }

  getUsers() {
    return this.http.get<User[]>("http://localhost:3000/posts")
      .pipe(map((res: User[]) => {
        return res;
      }))
  }

  updateUser(user: User, id: number) {
    return this.http.put<User>("http://localhost:3000/posts/" + id, user)
      .pipe(map((res: User) => {
        return res;
      }))
  }

  deleteUser(id: number) {
    return this.http.delete<User>("http://localhost:3000/posts/" + id)
      .pipe(map((res: User) => {
        return res;
      }))
  }
  //recuperer le id courant :

  getIdCourrant() {
    return this.http.get<User[]>("http://localhost:3000/posts")
      .pipe(map((res: User[]) => {
        for (let i = 0; i < res.length - 1; i++) {
          if (res[i].id < res[i + 1].id) {
            this.idCourrant = res[i + 1].id;
          }
        }
        return this.idCourrant;
      }))
  }
}
