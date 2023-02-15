import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { User } from './user.model';
import { CRUDService } from '../services/crud.service';
import { MoyenneComponent } from '../moyenne/moyenne.component';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { store } from '../store/store';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {
  formulaire!: FormGroup;
  userModel!: User;
  users: User[] = [];
  somme: number = 0;
  moyenne: number = 0;
  max: number = 0;
  afficher = false;
  currentId !: number;



  constructor(private store: store) {
    console.log(store);
  }

  ngOnInit(): void {
    this.formulaire = new FormGroup(
      {
        "prenom": new FormControl(null),
        "age": new FormControl(null)
      }
    )
    this.getAllUsers();
  }

  ngOnChanges() {

    this.users = this.store.users;
  }
  //*********** Post using crud service **************

  postUserInfos() {
    /* this.getIdCourrant();
     const userData: User = { id: this.currentId + 1, prenom: String(this.formulaire.value.prenom), age: this.formulaire.value.age }
     this.crud.postUser(userData)
       .subscribe(res => {
         console.log(res);
         //  alert("user ajouté avec succes");
       },
         err => {
           alert("user non ajouté");
         }
       )
     this.users.push(userData);
     this.users = this.users.filter(x => x);
     this.formulaire.reset();*/
  }

  //*********** Post using crud service **************

  postUsingStore() {
    const userData: User = { id: this.currentId + 1, prenom: String(this.formulaire.value.prenom), age: this.formulaire.value.age }
    this.store.postUserInfos(userData);
    this.formulaire.reset();
  }

  //*********** Get using store **************
  getAllUsers() {
    this.store.getAllUsers2();
    this.store.getAllUsers().subscribe((res: User[]) => {
      this.users = res;
    })
  }

  //*********** Delete using crud service **************

  deleteUser(user: User) {
    /* this.crud.deleteUser(user.id).subscribe(res => {
       for (let i = 0; i < this.users.length; i++) {
         if (this.users[i].id == user.id) {
           this.users.splice(i, 1);
         }
       }
       this.currentId--;
     })
     this.users = this.users.filter(x => x);*/
  }

  //************  Delete using store    **************

  deleteUsingStore(user: User) {
    this.store.deleteUser(user);
    this.store.users = this.store.users.filter(x => x);
  }

  //************* On Edit   **************

  onEdit(user: User) {
    this.afficher = true;
    this.userModel = user;
    this.formulaire.controls['prenom'].setValue(user.prenom);
    this.formulaire.controls['age'].setValue(user.age);

  }

  //*********** Update using crudService   **************

  updateUser() {
    /* const userData: User = { id: this.userModel.id, prenom: String(this.formulaire.value.prenom), age: this.formulaire.value.age }
     this.crud.updateUser(userData, userData.id).subscribe(res => {
       alert("user modifié");
       for (let i = 0; i < this.users.length; i++) {
         if (this.users[i].id == this.userModel.id) {
           this.users[i] = userData;
         }
       }
       this.users = this.users.filter(x => x);
       this.formulaire.reset();
       this.afficher = false;
     })*/
  }

  //*********** Update using store

  updateUsingStore() {
    const userData: User = { id: this.userModel.id, prenom: String(this.formulaire.value.prenom), age: this.formulaire.value.age }
    this.store.updateUser(userData);
    this.formulaire.reset();
    this.afficher = false;
    //this.users = this.users.filter(x => x);
  }

  /* getIdCourrant() {
     this.crud.getIdCourrant().subscribe((res: Number) => {
       this.currentId = Number(res) + 1;
       console.log(this.currentId);
     });
   }*/
}
