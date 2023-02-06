import { Component ,Input, OnInit} from '@angular/core';
import { User } from '../list/user.model';

@Component({
  selector: 'app-somme',
  templateUrl: './somme.component.html',
  styleUrls: ['./somme.component.scss']
})
export class SommeComponent{
 @Input() somme !: number;



}
