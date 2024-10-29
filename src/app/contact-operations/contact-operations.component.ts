// import { Component, OnInit } from '@angular/core';
// import { ContactService } from '../services/contact.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Contact } from '../models/contact';

// @Component({
//   selector: 'app-contact-operations',
//   templateUrl: './contact-operations.component.html',
//   styleUrls: ['./contact-operations.component.scss'],
// })
// export class ContactOperationsComponent implements OnInit {
//   contacts: Contact[] = [];
//   selectedContacts: number[] = [];
//   loading: boolean = false;

//   constructor(
//     private contactService: ContactService,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit(): void {
//     this.loadContacts();
//   }

//   loadContacts(): void {
//     this.loading = true;
//     this.contactService.getAllContacts().subscribe(
//       (response) => {
//         this.contacts = response.data;
//         this.loading = false;
//       },
//       (error) => {
//         this.loading = false;
//         this.snackBar.open('Failed to load contacts', 'Close', {
//           duration: 3000,
//           panelClass: ['snackbar-error'],
//         });
//       }
//     );
//   }

//   toggleContactSelection(contactId: number): void {
//     if (this.selectedContacts.includes(contactId)) {
//       this.selectedContacts = this.selectedContacts.filter(
//         (id) => id !== contactId
//       );
//     } else {
//       this.selectedContacts.push(contactId);
//     }
//   }

//   batchDeleteContacts(): void {
//     const confirmed = confirm(
//       'Are you sure you want to delete the selected contacts?'
//     );
//     if (confirmed && this.selectedContacts.length > 0) {
//       this.loading = true;
//       this.contactService.batchDeleteContacts(this.selectedContacts).subscribe(
//         () => {
//           this.snackBar.open(
//             'Selected contacts deleted successfully',
//             'Close',
//             {
//               duration: 3000,
//               panelClass: ['snackbar-success'],
//             }
//           );
//           this.loadContacts();
//           this.selectedContacts = [];
//           this.loading = false;
//         },
//         (error) => {
//           this.snackBar.open('Failed to delete selected contacts', 'Close', {
//             duration: 3000,
//             panelClass: ['snackbar-error'],
//           });
//           this.loading = false;
//         }
//       );
//     }
//   }
// }
