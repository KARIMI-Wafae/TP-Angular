import { Component, OnInit } from '@angular/core';
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
export class ListComponent implements OnInit {
  formulaire!: FormGroup;
  userModel!: User ;
  users: User[]=[];
  somme : number =0;
  moyenne : number=0;
  x : number =0;
  afficher = false;
  currentId !: number;



  constructor(private crud: CRUDService,private store : store) {
    console.log(store);

  }

  ngOnInit(): void {
    this.formulaire = new FormGroup(
      {
        "prenom": new FormControl(null),
        "age": new FormControl(null)
      }
    )
   // this.getAllUsers();
   this.store.getAllUsers();
  }



  postUserInfos() {
    this.getIdCourrant();
    const userData:User = {id:this.currentId+1, prenom : String(this.formulaire.value.prenom), age: this.formulaire.value.age}
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
    this.formulaire.reset();
  }
  postUsingStore(prenom : string, age : number ){
    const userData:User = {id:this.currentId+1, prenom : String(this.formulaire.value.prenom), age: this.formulaire.value.age}
  //  store.postUserInfos(userData)
  }

  getAllUsers() {
    this.crud.getUsers().subscribe((res: User[]) => {
      this.users = res;
      this.currentId= res.length;
      this.somme=0;
       this.moyenne=0;
       console.log('list-getusers')
       res.forEach(element => {
        if(element.age != null){
          let age : number= Number(element.age);
            this.somme+=age;
        }
      })
      this.moyenne=Math.trunc(this.somme/this.users.length);
    })
  }

  deleteUser(user: User) {
    this.crud.deleteUser(user.id).subscribe(res => {
     for (let i=0; i< this.users.length;i++){
      if(this.users[i].id == user.id){
        this.users.splice(i,1);
      }
     }
     this.currentId--;
    })
    this.users = this.users.filter(x => x);
  }
  onEdit(user: User) {
    this.afficher = true;
    this.userModel = user;
    this.formulaire.controls['prenom'].setValue(user.prenom);
    this.formulaire.controls['age'].setValue(user.age);

  }

  updateUser() {
    const userData:User = {id:this.userModel.id, prenom : String(this.formulaire.value.prenom), age: this.formulaire.value.age}
    this.crud.updateUser(userData, userData.id).subscribe(res => {
      alert("user modifié");
     for(let i=0; i< this.users.length;i++){
       if(this.users[i].id == this.userModel.id)  {
        this.users[i]=userData;
       }
     }
     this.users = this.users.filter(x => x);
      this.formulaire.reset();
      this.afficher = false;
    })
  }

  getIdCourrant(){
    this.crud.getIdCourrant().subscribe((res: Number) => {
     this.currentId = Number(res)+1 ;
     console.log(this.currentId);
  });
  }
  change(){
    this.x=Math.random();
  }
}
