import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, find, map } from 'rxjs/operators';

import { Contact } from '../models/contact.model';

@Injectable()
export class ContactService {
  private contactsUrl = 'app/contacts';
  private contact: Observable<Contact>;

  constructor(private http: HttpClient) { }

  public getContacts(): Observable<Contact[]> {
    return this.http.get<any>(this.contactsUrl)
      .pipe(
        map(response => response.data || response)
      )
  }

  public getContact(id: number): Observable<Contact> {
    return this.getContacts().pipe(
      map(contacts => contacts.filter(contact => contact.id == id)[0])
    );
  }

  public save(contact: Contact): Observable<Contact> {
    if (contact.id) {
      return this.put(contact);
    }
  }

  public new(contact: Contact): Observable<Contact> {
    return this.post(contact);
  }

  public delete(contact: Contact): Observable<Contact> {
    const url = `${this.contactsUrl}/${contact.id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete<any>(url, httpOptions)
      .pipe(
        map(response => response.data)
      )
  }

  public put(contact: Contact): Observable<Contact> {
    const url = `${this.contactsUrl}/${contact.id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<any>(url, JSON.stringify(contact), httpOptions)
      .pipe(
        map(response => response.data)
      )
  }

  public post(contact: Contact): Observable<Contact> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.contactsUrl, JSON.stringify(contact), httpOptions)
      .pipe(
        map(response => response.data)
      )
  }
}
