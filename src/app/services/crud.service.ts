import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../list/user.model';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {


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
}
