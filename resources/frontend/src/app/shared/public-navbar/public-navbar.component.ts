import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_auth/auth.service'

@Component({
  selector: 'app-public-navbar',
  templateUrl: './public-navbar.component.html',
  styleUrls: ['./public-navbar.component.scss']
})
export class PublicNavbarComponent implements OnInit {

  public routePath: string;
  public authorized: Boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router) {
    this.routePath = router.url;
    this.authorized = this.authService.getToken() ? true : false;
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (this.authService.getToken()) {
          this.authorized = true;
        } else {
          this.authorized = false;
        }
        this.routePath = event.url;
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
