import { Component, OnInit, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { AuthService } from '../../../shared/_auth/auth.service'
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../../../shared/_constants/global.constants';
import { countriesJson } from '../../../shared/_constants/country';
@Component({
  selector: 'app-request-access-form',
  templateUrl: './request-access-form.component.html',
  styleUrls: ['./request-access-form.component.scss']
})
export class RequestAccessFormComponent implements OnInit {

  public authorized: Boolean = false;
  public userInfoForm: FormGroup;
  therapyAreasRoute: string;
  requestAccessRoute: string;
  therapyAreas = []
  marketAna = {
    select_all: 0,
    total_market_view: 0,
    therapy_area_ana: 0,
    brand_ana: 0,
    molecule_ana: 0
  }
  countries = countriesJson

  constructor(private constants: GlobalConstants, private http: HttpClient, private authService: AuthService) {
    this.therapyAreasRoute = `${this.constants.APIURL}/therapy-areas`
    this.requestAccessRoute = `${this.constants.APIURL}/request-access`

    this.http.get<any>(this.therapyAreasRoute)
      .subscribe((res: any) => {
        this.therapyAreas = res.therapy_areas
        this.therapyAreas.forEach(therapyArea => {
          therapyArea.selectAll = false
          therapyArea.disesePrevalenceAna = false
          therapyArea.treateMapping = false
          therapyArea.patientForecasting = false
          therapyArea.diagnostics = false
        })
      })
  }

  ngOnInit() {
    this.authorized = this.authService.getToken() ? true : false;

    this.userInfoForm = new FormGroup({
      'first_name': new FormControl(null, [Validators.required]),
      'last_name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'company_name': new FormControl(null, [Validators.required]),
      'title': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, []),
      'state': new FormControl(null, []),
      'country': new FormControl(null, [Validators.required]),
      'telephone': new FormControl(null, [Validators.required]),
    });
    this.userInfoForm.controls['country'].setValue('', { onlySelf: true });
  }

  private customEmailValidator(control): { [key: string]: any } {
    const emailError = Validators.email(control);
    if (control.value && emailError) {
      return { 'email': {} };
    }

    return null;
  }

  preventSubmit($event) {
    $event.preventDefault();
  }

  isTherapyAreaChecked() {
    for (let index = 0; index < this.therapyAreas.length; index++) {
      let therapyArea = this.therapyAreas[index];
      if (therapyArea.disesePrevalenceAna || therapyArea.treateMapping || therapyArea.patientForecasting || therapyArea.diagnostics) {
        return true;
      }
    }
    return false;
  }

  isMarketAnaChecked() {
    for (var key in this.marketAna) {
      if (this.marketAna.hasOwnProperty(key)) {
        if (this.marketAna[key] === 1 || this.marketAna[key] === true) {
          return true;
        }
      }
    }
    return false;
  }

  onChangeSwitchEvent($event, therapyArea) {
    if ($event) {
      therapyArea.disesePrevalenceAna = true;
      therapyArea.treateMapping = true;
      therapyArea.patientForecasting = true;
      therapyArea.diagnostics = true;
    } else {
      therapyArea.disesePrevalenceAna = false;
      therapyArea.treateMapping = false;
      therapyArea.patientForecasting = false;
      therapyArea.diagnostics = false;
    }
  }

  onChangeSwitchEventForMktAna($event) {
    if ($event) {
      this.marketAna = {
        select_all: $event,
        total_market_view: 1,
        therapy_area_ana: 1,
        brand_ana: 1,
        molecule_ana: 1
      }
    } else {
      this.marketAna = {
        select_all: $event,
        total_market_view: 0,
        therapy_area_ana: 0,
        brand_ana: 0,
        molecule_ana: 0
      }
    }
  }
  submitForm() {
    if (!this.userInfoForm.valid || (!this.isTherapyAreaChecked() && !this.isMarketAnaChecked())) {
      return;
    }
    let userInfo = this.userInfoForm.value;
    this.http.post<any>(this.requestAccessRoute, {
      user_info: userInfo,
      therapy_areas: this.therapyAreas,
      market_ana: this.marketAna
    })
      .subscribe((res: any) => {
        swal("Success", res.message, "success");
        this.userInfoForm.reset();
        this.therapyAreas.forEach(therapyArea => {
          therapyArea.selectAll = false;
          therapyArea.disesePrevalenceAna = false
          therapyArea.treateMapping = false
          therapyArea.patientForecasting = false
          therapyArea.diagnostics = false
          this.marketAna = {
            select_all: 0,
            total_market_view: 0,
            therapy_area_ana: 0,
            brand_ana: 0,
            molecule_ana: 0
          }
        })
      })
  }
}
