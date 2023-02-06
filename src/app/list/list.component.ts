import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { User } from './user.model';
import { CRUDService } from '../services/crud.service';
import { MoyenneComponent } from '../moyenne/moyenne.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  formulaire!: FormGroup;
  userModel: User = new User();
  users!: User[];
  somme : number =0;
  moyenne : number=0;
  val !: number;
  afficher = false;
  constructor(private crud: CRUDService) { }

  ngOnInit(): void {
    this.formulaire = new FormGroup(
      {
        "prenom": new FormControl(null),
        "age": new FormControl(null)
      }
    )
    this.getAllUsers();


  }

  postUserInfos() {
    this.userModel.prenom = this.formulaire.value.prenom;
    this.userModel.age = this.formulaire.value.age;
    this.crud.postUser(this.userModel)
      .subscribe(res => {
        console.log(res);
      //  alert("user ajouté avec succes");
      },
        err => {
          alert("user non ajouté");
        }
      )
   // this.users.push(this.userModel);
    this.getAllUsers();
    this.formulaire.reset();
  }

  getAllUsers() {
    this.crud.getUsers().subscribe((res: User[]) => {
      this.users = res;
      this.somme=0;
       this.moyenne=0;
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
     // alert("user supprimé");
      this.getAllUsers();
    })
  }
  onEdit(user: any) {
    this.afficher = true;
    this.userModel.id = user.id;
    this.formulaire.controls['prenom'].setValue(user.prenom);
    this.formulaire.controls['age'].setValue(user.age);

  }

  updateUser() {
    this.userModel.prenom = this.formulaire.value.prenom;
    this.userModel.age = this.formulaire.value.age;
    this.crud.updateUser(this.userModel, this.userModel.id).subscribe(res => {
      alert("user modifié");
      this.getAllUsers();
      this.formulaire.reset();
      this.afficher = false;
    })
  }

}
