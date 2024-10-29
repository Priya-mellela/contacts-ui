import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-add-or-update-contact',
  templateUrl: './add-or-update-contact.component.html',
  styleUrls: ['./add-or-update-contact.component.scss'],
})
export class AddOrUpdateContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    public dialogRef: MatDialogRef<AddOrUpdateContactComponent>,
    @Inject(MAT_DIALOG_DATA) public contact: Contact
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(30)]],
      position: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.contact) {
      this.contactForm.patchValue(this.contact);
    }
  }

  saveContact(): void {
    if (this.contactForm.valid) {
      if (this.contact) {
        const updatedContact = { ...this.contact, ...this.contactForm.value };
        this.contactService.updateContact(updatedContact).subscribe(() => {
          this.contactService.updateContactsList(); // Notify changes
          this.dialogRef.close();
        });
      } else {
        this.contactService.addContact(this.contactForm.value).subscribe(() => {
          this.contactService.updateContactsList();
          this.dialogRef.close();
        });
      }
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
