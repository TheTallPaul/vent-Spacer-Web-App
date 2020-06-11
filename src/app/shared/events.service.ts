import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  spacingFeet = 10;
  private eventDoc: AngularFirestoreDocument<Event>;
  event: Observable<Event>;

  form = new FormGroup({
    spacing_meters: new FormControl(this.spacingFeet),
    name: new FormControl(''),
    nw_boundary: new FormControl(''),
    se_boundary: new FormControl(''),
  });

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore
  ){}

  update(event: Event) {
    this.eventDoc.update(event);
  }

  createEvent(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('events')
        .add(data)
        .then(
          // TO-DO: make this work in the component, not the service
          res => { this.router.navigate(['/view-event/' + res.id]); },
          err => reject(err)
        );
    });
  }

  getEvent(eventID) {
    return this.firestore.collection('events').doc(eventID).valueChanges();
  }
}
