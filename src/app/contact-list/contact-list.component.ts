import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { AddOrUpdateContactComponent } from '../add-or-update-contact/add-or-update-contact.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'actions'];
  searchTerm: string = '';
  loading: boolean = false;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  pageSize: number = 5;
  currentPage: number = 0;
  filteredContacts: Contact[] = [];
  paginatedContacts: Contact[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private contactService: ContactService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactService.contacts$.subscribe((contacts) => {
      this.contacts = contacts;
      this.filteredContacts = contacts;
      this.updatePaginatedContacts();
    });
    this.loadContacts();
  }

  loadContacts(): void {
    this.loading = true;
    this.contactService.getAllContacts().subscribe(
      () => {
        this.contactService.updateContactsList();
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.showSnackBar('Failed to load contacts', 'Close', 'snackbar-error');
      }
    );
  }

  openAddOrEditContactDialog(contact?: Contact): void {
    const dialogRef = this.dialog.open(AddOrUpdateContactComponent, {
      width: '400px',
      data: contact,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const message = contact
          ? 'Contact updated successfully'
          : 'Contact added successfully';
        this.showSnackBar(message, 'Close', 'snackbar-success');
        this.contactService.updateContactsList();
      }
    });
  }

  deleteContact(contact: Contact): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '500px',
      data: { name: contact.name },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.loading = true;

        this.contactService.deleteContact(contact.id).subscribe(
          () => {
            this.loading = false;
            this.showSnackBar(
              'Contact deleted successfully',
              'Close',
              'snackbar-success'
            );
            this.contactService.updateContactsList();
          },
          (error) => {
            this.loading = false;
            this.snackBar.open('Failed to delete contact', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
          }
        );
      }
    });
  }

  filterContacts(): void {
    if (!this.searchTerm) {
      this.filteredContacts = this.contacts;
    } else {
      this.filteredContacts = this.contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          contact.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          contact.phone.includes(this.searchTerm) ||
          contact.position.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.paginator.firstPage();
    this.updatePaginatedContacts();
  }

  loadContactDetails(contact: Contact): void {
    this.router.navigate(['/view-contact'], {
      queryParams: {
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        address: contact.address,
        position: contact.position,
        createdDate: contact.createdDate,
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedContacts();
  }

  updatePaginatedContacts(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.paginatedContacts = this.filteredContacts.slice(
      startIndex,
      startIndex + this.pageSize
    );
    this.paginator.length = this.filteredContacts.length;
  }
  private showSnackBar(
    message: string,
    action: string,
    panelClass: string
  ): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: [panelClass],
    });
  }
}
