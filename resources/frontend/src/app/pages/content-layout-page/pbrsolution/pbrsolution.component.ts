import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/_auth/auth.service'

@Component({
  selector: 'app-pbrsolution',
  templateUrl: './pbrsolution.component.html',
  styleUrls: ['./pbrsolution.component.scss']
})
export class PbrsolutionComponent implements OnInit {

  public authorized: Boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authorized = this.authService.getToken() ? true : false;
  }

}
