import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Contact, ContactResponse } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:8083/contacts';

  private contactsSubject = new BehaviorSubject<Contact[]>([]);
  public contacts$ = this.contactsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<ContactResponse> {
    return this.http.get<ContactResponse>(this.apiUrl);
  }

  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${contact.id}`, contact);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  batchDeleteContacts(contactIds: number[]): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(
      `${this.apiUrl}/batch-delete`,
      contactIds
    );
  }

  updateContactsList(): void {
    this.getAllContacts().subscribe((response) => {
      this.contactsSubject.next(response.data || []);
    });
  }
}
