import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];
  contactSelected = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor(private http: HttpClient) {
    this.contacts = [];
    this.maxContactId - this.getMaxId();

    http
      .get<Contact[]>(
        'https://ng-cms-d18a4-default-rtdb.firebaseio.com/contacts.json'
      )
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) =>
            a.name > b.name ? 1 : a.name < b.name ? -1 : 0
          );
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  // getContacts(): Contact[] {
  //   return this.contacts
  //     .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
  //     .slice();
  // }

  storeContacts() {
    let contacts = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put(
      'https://ng-cms-d18a4-default-rtdb.firebaseio.com/contacts.json',
      contacts,
      { headers: headers }
    )
    .subscribe(() => {
      this.contactListChangedEvent.next(this.contacts.slice())
    })
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id == id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId = 0;

    for (let contact of this.contacts) {
      let currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId + 1;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    this.maxContactId++;
    let newId = +newContact.id;
    newId = this.maxContactId;
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(ogContact: Contact, newContact: Contact) {
    if (!ogContact || !newContact) {
      return;
    }

    const index = this.contacts.indexOf(ogContact);
    if (index < 0) {
      return;
    }

    newContact.id = ogContact.id;
    this.contacts[index] = newContact;
    this.storeContacts();
    }
}
