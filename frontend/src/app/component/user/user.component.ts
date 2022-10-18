import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {GeneralService} from '../../services/general.service';
import { User } from '../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  id: any;
  user: any;

  constructor(private _Activatedroute:ActivatedRoute, private backend: GeneralService) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get("nombre");
    this.backend.createUser(this.id).subscribe(
      res => {
        this.user = res;
      },
      err => console.log(err)
    );
  }

}
