import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './duyet-nghi-phep.component.html',
})
export class DuyetNghiPhepComponent implements OnInit {
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  firestore = inject(Firestore);
  id!: string;
  step = 0;
  data = '';
  reason = '';
  reviewer!: string;
  form: any = {
    type: ''
  };
  loading = false;
  loadingText = 'Đang xử lý...';
  rejectReason = '';

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.reviewer = this.route.snapshot.queryParamMap.get('reviewer')?.replace(' ', '+') ?? '';
    const docRef = doc(this.firestore, "pendings", this.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      this.form = docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      this.loadingText = "Đã duyệt";
    }
  }
  duyet() {
    this.loading = true;
    const params = {
      id: this.id,
      reviewer: this.reviewer,
      isApproved: true,
    };
    this.http.post(
      'https://us-central1-xin-nghi-phep.cloudfunctions.net/duyetNghiPhep',
      // 'http://127.0.0.1:5001/xin-nghi-phep/us-central1/duyetNghiPhep',
      params,
    ).subscribe({
      next: (data: any) => {
        console.log(data);
        this.data = data.data;
        this.step = 1;
        this.loading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.step = 3;
        this.loading = false;
      }
    });
  }
  tuChoi() {
    this.loading = true;
    const params = {
      id: this.id,
      reviewer: this.reviewer,
      isApproved: false,
      rejectReason: this.rejectReason,
    };
    this.http.post(
      'https://us-central1-xin-nghi-phep.cloudfunctions.net/duyetNghiPhep',
      // 'http://127.0.0.1:5001/xin-nghi-phep/us-central1/duyetNghiPhep',
      params,
    ).subscribe({
      next: (data: any) => {
        console.log(data);
        this.data = data.data;
        this.step = 2;
        this.loading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.step = 3;
        this.loading = false;
      }
    });
  }
}