import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
// import { fadeAnimation } from '../../animations'

@Component({
    selector: 'app-content-layout',
    templateUrl: './content-layout.component.html',
    styleUrls: ['./content-layout.component.scss']
    // animations: [fadeAnimation]
})

export class ContentLayoutComponent {
    public navBarNeeded: boolean = true;
    public footerNeeded: boolean = true;
    public currentDate: Date = new Date();

    constructor(private router: Router) {
        router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                if (event.url.includes('/login') || event.url === '/signup') {
                    // this.navBarNeeded = false;
                    this.footerNeeded = false;
                }
                else {
                    // this.navBarNeeded = true;
                    this.footerNeeded = true
                }
            }
        });
    }

    getPage(outlet) {
        console.log(outlet.activatedRouteData['title'] || '');
        // o.isActivated ? o.activatedRoute : ''
        return outlet.activatedRouteData['title'] || '';
    }
}