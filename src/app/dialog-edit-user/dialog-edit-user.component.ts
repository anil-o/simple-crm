import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  user: User;
  birthDate: Date;
  loading = false;
  firestore: Firestore = inject(Firestore);
  users$: Observable<any>;
  allUsers: Array<any> = [];

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) { }

  ngOnInit(): void {
    const user = collection(this.firestore, 'users');
    this.users$ = collectionData(user);
    this.users$.subscribe((changes: any) => {
      this.allUsers = changes;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveUser() {
    this.loading = true;
    const user = collection(this.firestore, 'users');
    const docRef = doc(user, this.user.customIdName);
    updateDoc(docRef, this.user.toJson()).then(() => {
      this.loading = false;
      this.closeDialog();
    });
  }
}
