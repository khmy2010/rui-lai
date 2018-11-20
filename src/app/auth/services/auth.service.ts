import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  async login() {
    const res = await this.afAuth.auth.signInWithPopup(
      new auth.GoogleAuthProvider()
    );
    const profile: any = res.additionalUserInfo.profile;
    console.log(profile);

    const user: User = {
      email: profile.email,
      familyName: profile.family_name,
      givenName: profile.given_name,
      name: profile.name,
      lastSeen: Date.now(),
      created: Date.now()
    };

    // const userCollection: AngularFirestoreCollection<User> = this.afs.collection<User>('users');
    // const dbUser = userCollection.snapshotChanges().pipe()

    // const dbUser = this.afs
    //   .collection<User>('users', ref => ref.where('email', '==', profile.email))
    //   .get()
    //   .subscribe(val => {
    //     if (val.empty) {
    //       //new user
    //       console.log('alo new user');
    //       this.afs.collection<User>('users').add(user);
    //     } else {
    //       // this.afs.collection<User>('users').add(user);
    //     }
    //   });

    this.afs
      .collection<User>('users', ref => ref.where('email', '==', profile.email))
      .get()
      .pipe(
        map(res => res.docs.map(doc => doc.data)),
        switchMap(userArr => {
          return this.afs.collection<User>('users').add(user);
        })
      )
      .subscribe(res => {
        console.log(res);
      });
  }
}
