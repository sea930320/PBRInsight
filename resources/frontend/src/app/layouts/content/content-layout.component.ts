import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-content-layout',
    templateUrl: './content-layout.component.html',
    styleUrls: ['./content-layout.component.scss']
})

export class ContentLayoutComponent {
    public navBarNeeded: boolean = true;

    constructor(private router: Router) {
        // router.events.subscribe((event: any) => {
        //     if (event instanceof NavigationEnd) {
        //         if (event.url === '/login' || event.url === '/signup') {
        //             this.navBarNeeded = false;
        //         }
        //         else {
        //             this.navBarNeeded = true;
        //         }
        //     }
        // });
    }
}