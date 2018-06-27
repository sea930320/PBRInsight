import { Injectable } from '@angular/core';
import { isDevMode } from '@angular/core';

@Injectable()
export class GlobalConstants {
    readonly APIURL: string;
    isLocal: boolean;

    constructor() {
        if (this.getMode() !== true) {
            console.log("production");
            this.APIURL = 'https://www.PBRInsight.com/api';
        }
        else {
            console.log("development");
            this.APIURL = 'http://localhost:8000/api';
        }
    }

    private getMode() {
        this.isLocal = isDevMode();
        console.log("constants mode isLocal", this.isLocal);
        return this.isLocal;
    }
}
