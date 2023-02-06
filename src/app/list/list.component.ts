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
  users!: any;
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
        alert("user ajouté avec succes");
      },
        err => {
          alert("user non ajouté");
        }
      )
    this.getAllUsers();
    this.formulaire.reset();
  }

  getAllUsers() {
    this.crud.getUser().subscribe(res => {
      this.users = res;
    })
  }

  deleteUser(user: any) {
    this.crud.deleteUser(user.id).subscribe(res => {
      alert("user supprimé");
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
