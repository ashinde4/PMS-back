import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { PensionerDetailService } from 'src/services/pensioner-detail.service';
import { PensionDisbursementService } from 'src/services/pension-disbursement.service';
import { Router } from '@angular/router';
import { Pensioner } from '../../models/pensioner';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-pensioner-detail',
  templateUrl: './pensioner-detail.component.html',
  styleUrls: ['./pensioner-detail.component.css']
})
export class PensionerDetailComponent implements OnInit {

  pensionDetails = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    dateOfBirth: new FormControl(null, [Validators.required]),
    panNumber: new FormControl(null, [Validators.required]),
    typeOfPension: new FormControl(null, [Validators.required]),
    aadhaarNumber: new FormControl(null, [Validators.required]),
  });

  pensionerSubmitted = false;
  pensionerError = false;
  updatedPensionerDetails: Pensioner;
  constructor(private router: Router, private pensionerDetailService: PensionerDetailService, private pensionDisbursementService: PensionDisbursementService) {
    this.updatedPensionerDetails = {}
  }

  ngOnInit(): void {
    //this.pensionDisbursementService.setPensionerDetails(this.updatedPensionerDetails);
  }
  onSubmit() {
    this.pensionerSubmitted = true;
    this.pensionerError = false;
    if (this.pensionDetails.valid) {
      var params = new HttpParams()
        .set('name', this.pensionDetails.controls['name'].value.toString())
        .set('dob', this.pensionDetails.controls['dateOfBirth'].value)
        .set('pan', this.pensionDetails.controls['panNumber'].value)
        .set('aadhaar', this.pensionDetails.controls['aadhaarNumber'].value)
        .set('type', this.pensionDetails.controls['typeOfPension'].value)
      var Get_URL = params.toString();
      console.log(Get_URL)


      this.pensionerDetailService.PensionDetails(Get_URL).subscribe(
        (response: Pensioner) => {
          this.updatedPensionerDetails = response;
          console.log(response);
          if (response != null) {
            this.pensionDisbursementService.setPensionerDetails(this.updatedPensionerDetails);
            this.router.navigate(['/dashboard']);
          } else {
            this.pensionerSubmitted = false;
            this.pensionerError = true
          }
          //window.location.href="/delete"
        },
        error => { console.log(error); this.pensionerError = true }
      )
    } else {

    }
  }

}
