import { CommonModule, formatDate } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, Pipe, PipeTransform, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import pick from 'lodash-es/pick';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Pipe({ standalone: true, name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: any) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
// @NgModule({
//   declarations: [SafeHtmlPipe],
//   exports: [SafeHtmlPipe],
// })
// class FooModule {}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProgressBarComponent,
    ReactiveFormsModule,
    HttpClientModule,
    SafeHtmlPipe,
  ],
  selector: 'app-root',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  fb = inject(FormBuilder);
  firestore = inject(Firestore);
  http = inject(HttpClient);

  form1!: FormGroup;
  form2!: FormGroup;
  formBHXH!: FormGroup;
  form3!: FormGroup;
  form4!: FormGroup;
  form5!: FormGroup;
  emailType: FormControl = new FormControl('personal', [Validators.required]);
  name: FormControl = new FormControl('', [Validators.required]);
  title: FormControl = new FormControl('Nhân viên/KTV', [Validators.required]);
  unit: FormControl = new FormControl('', [Validators.required]);
  type: FormControl = new FormControl('Nghỉ phép', [Validators.required]);
  mode: FormControl = new FormControl('Phép năm', [Validators.required]);
  mode2: FormControl = new FormControl('Phép năm', [Validators.required]);
  reason2: FormControl = new FormControl('', [Validators.required]);
  reasonBHXH: FormControl = new FormControl('', [Validators.required]);
  reason3: FormControl = new FormControl('', [Validators.required]);
  reason4: FormControl = new FormControl('', [Validators.required]);
  days: FormControl = new FormControl(0.5, [Validators.required]);
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  emailGroup: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  fromDate2: FormControl = new FormControl(
    formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    [Validators.required]
  );
  fromDateBHXH: FormControl = new FormControl(
    formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    [Validators.required]
  );
  fromDate4: FormControl = new FormControl(
    formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    [Validators.required]
  );
  toDate2: FormControl = new FormControl(
    formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    [Validators.required]
  );
  toDateBHXH: FormControl = new FormControl(
    formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    [Validators.required]
  );
  toDate4: FormControl = new FormControl(
    formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    [Validators.required]
  );
  fromTime3: FormControl = new FormControl('', [Validators.required]);
  fromTime4: FormControl = new FormControl('', [Validators.required]);
  toTime3: FormControl = new FormControl('', [Validators.required]);
  toTime4: FormControl = new FormControl('', [Validators.required]);
  onDate: FormControl = new FormControl(
    formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    [Validators.required]
  );
  // changeReason: FormControl = new FormControl('', [
  //   Validators.required,
  // ]);
  // missionFromDate: FormControl = new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en'), [
  //   Validators.required,
  // ]);
  // missionToDate: FormControl = new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en'), [
  //   Validators.required,
  // ]);
  // missionFromTime: FormControl = new FormControl('', [
  //   Validators.required,
  // ]);
  // missionToTime: FormControl = new FormControl('', [
  //   Validators.required,
  // ]);
  // where: FormControl = new FormControl('', [
  //   Validators.required,
  // ]);

  units!: Unit[];
  emailGroups!: String[];
  step = 0;
  isDateError = false;
  isTimeError = false;
  isMissionTimeError = false;
  data = '';
  loading = false;
  loadingText = 'Đang gửi...';

  ngOnInit(): void {
    this.form1 = this.fb.group({});
    this.form1.addControl('emailType', this.emailType);
    this.form1.addControl('email', this.email);
    // this.form1.addControl('emailGroup', this.email);
    this.form1.addControl('name', this.name);
    this.form1.addControl('title', this.title);
    this.form1.addControl('unit', this.unit);
    this.form1.addControl('type', this.type);
    // this.form1.addControl('type', this.type);

    this.form2 = this.fb.group({});
    this.form2.addControl('fromDate', this.fromDate2);
    this.form2.addControl('toDate', this.toDate2);
    this.form2.addControl('mode', this.mode);
    this.form2.addControl('reason', this.reason2);

    this.formBHXH = this.fb.group({});
    this.formBHXH.addControl('fromDate', this.fromDateBHXH);
    this.formBHXH.addControl('toDate', this.toDateBHXH);
    this.formBHXH.addControl('mode', this.mode);
    this.formBHXH.addControl('reason', this.reasonBHXH);

    this.form3 = this.fb.group({});
    this.form3.addControl('fromTime', this.fromTime3);
    this.form3.addControl('toTime', this.toTime3);
    this.form3.addControl('onDate', this.onDate);
    this.form3.addControl('reason', this.reason3);

    this.form4 = this.fb.group({});
    this.form4.addControl('fromDate', this.fromDate4);
    this.form4.addControl('toDate', this.toDate4);
    this.form4.addControl('fromTime', this.fromTime4);
    this.form4.addControl('toTime', this.toTime4);
    this.form4.addControl('reason', this.reason4);

    this.form5 = this.fb.group({});
    this.form5.addControl('days', this.days);

    const col = collection(this.firestore, 'units');

    collectionData(col, { idField: 'groupName' }).subscribe((data) => {
      console.log(data);

      this.units = data.map((unit) => Unit.fromJson(unit));
      console.log(this.units);
    });

    collectionData(collection(this.firestore, 'email_groups'), {
      idField: 'value',
    }).subscribe((data) => {
      console.log(data);
      this.emailGroups = data.map((group) => group['value']);
    });
  }

  submitForm1() {
    if (this.form1.invalid) {
      return;
    } else {
      this.step++;
      // setTimeout(() => {
      //   this.form2.updateValueAndValidity();
      // }, 1000);
    }
  }

  async submitForm2() {
    if (Date.parse(this.fromDate2.value) > Date.parse(this.toDate2.value)) {
      this.isDateError = true;
      return;
    }
    if (this.form2.invalid) {
      return;
    } else {
      this.step++;
    }
  }

  async submitFormBHXH() {
    if (
      Date.parse(this.fromDateBHXH.value) > Date.parse(this.toDateBHXH.value)
    ) {
      this.isDateError = true;
      return;
    }
    if (this.formBHXH.invalid) {
      return;
    } else {
      this.step++;
    }
  }

  submitForm3() {
    console.log('run');

    // get minutes from fromTime value
    const fromTime = this.fromTime3.value.split(':');
    const fromTimeMinutes = Number(fromTime[0]) * 60 + Number(fromTime[1]);
    // get minutes from toTime value
    const toTime = this.toTime3.value.split(':');
    const toTimeMinutes = Number(toTime[0]) * 60 + Number(toTime[1]);
    // check if fromTime is greater than toTime
    if (fromTimeMinutes > toTimeMinutes) {
      this.isTimeError = true;
      return;
    }
    // check if fromTime is equal to toTime
    if (this.form3.invalid) {
      return;
    } else {
      // const params = {
      //   email: this.email.value,
      //   name: this.name.value,
      //   title: this.title.value,
      //   unit: this.unit.value,
      //   type: this.type.value,

      // }
      // this.http.post('http://127.0.0.1:5001/xin-nghi-phep/us-central1/helloWorld', params).subscribe({
      //   next: (data) => {
      //     console.log(data);
      this.step++;
      //   }
      // });
    }
  }

  submitForm4() {
    // get minutes from fromTime value
    const fromTime = this.fromTime4.value.split(':');
    const fromTimeSeconds =
      Number(fromTime[0]) * 3600 + Number(fromTime[1]) * 60;
    // get minutes from toTime value
    const toTime = this.toTime4.value.split(':');
    const toTimeSeconds = Number(toTime[0]) * 3600 + Number(toTime[1]) * 60;
    // check if fromTime is greater than toTime
    if (
      Date.parse(this.fromDate4.value) + fromTimeSeconds >
      Date.parse(this.toDate4.value) + toTimeSeconds
    ) {
      this.isMissionTimeError = true;
      return;
    }
    // check if fromTime is equal to toTime
    if (this.form4.invalid) {
      return;
    } else {
      this.step++;
    }
  }

  submitForm5() {
    // check if fromTime is equal to toTime
    if (this.form5.invalid) {
      return;
    } else {
      console.log('submit');
      this.loading = true;
      const params = {
        ...this.form1.value,
        ...(this.type.value == 'Nghỉ phép' ? this.form2.value : {}),
        ...(this.type.value == 'Nghỉ BHXH' ? this.formBHXH.value : {}),
        ...(this.type.value == 'Điều chỉnh chấm công' ? this.form3.value : {}),
        ...(this.type.value == 'Báo công tác' ? this.form4.value : {}),
        ...this.form5.value,
      };
      this.http
        .post(
          'https://us-central1-xin-nghi-phep.cloudfunctions.net/xinNghiPhep',
          // 'http://127.0.0.1:5001/xin-nghi-phep/us-central1/xinNghiPhep',
          params
        )
        .subscribe({
          next: (data: any) => {
            this.data = data.data;
            this.step++;
            this.loading = false;
          },
        });
    }
  }
}

class Unit {
  emailPGD: string;
  emailQLPB: string;
  xemTT: string[];
  groupName: string;
  constructor({ emailPGD, emailQLPB, xemTT, groupName }: Unit) {
    this.emailPGD = emailPGD;
    this.emailQLPB = emailQLPB;
    this.xemTT = xemTT;
    this.groupName = groupName;
  }
  static fromJson(dataObject: any): Unit {
    const _ = pick(dataObject, ['emailPGD', 'emailQLPB', 'xemTT', 'groupName']);
    return new Unit(_);
  }
}
