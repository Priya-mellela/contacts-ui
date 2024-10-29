import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { Contact } from '../models/contact';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  data: any = null;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.data = this.activatedRoute.snapshot.queryParams;
    console.log('came here', this.activatedRoute.snapshot.queryParams);
  }
}
