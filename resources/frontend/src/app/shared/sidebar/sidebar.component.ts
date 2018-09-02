import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
import { PermissionService } from '../_api/permission.service';

declare var $: any;
@Component({
    // moduleId: module.id,
    selector: 'app-sidebar',
    styleUrls: ['./sidebar.component.scss'],
    templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {

    public menuItems: any[];

    constructor(private router: Router, private route: ActivatedRoute, private permissionService: PermissionService) {
    }

    ngOnInit() {
        $.getScript('./assets/js/app-sidebar.js');
        this.permissionService.index()
            .subscribe((res: any) => {
                this.menuItems = ROUTES.filter(menuItem => {
                    switch (menuItem.title) {
                        case "Disease Prevalence":
                            if (!res.disease_prevalence_ana) {
                                return false
                            }
                            break;
                        case "Treatment Mapping":
                            if (!res.treatment_mapping) {
                                return false
                            }
                            break;
                        case "Market Data Analytics":
                            if (!res.market_ana) {
                                return false
                            }
                            break;
                        case "Diagnostics":
                            if (!res.diagnotics) {
                                return false
                            }
                            break;
                    }
                    return menuItem
                });
            });
    }

}
