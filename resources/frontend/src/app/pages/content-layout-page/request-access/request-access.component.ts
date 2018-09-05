import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/_auth/auth.service'

@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html',
  styleUrls: ['./request-access.component.scss']
})
export class RequestAccessComponent implements OnInit {

  public authorized: Boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authorized = this.authService.getToken() ? true : false;
  }

}
