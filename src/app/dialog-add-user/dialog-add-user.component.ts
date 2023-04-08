import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  user = new User();
  birthDate: Date;
  loading = false;

  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {

  }

  ngOnInit(): void {

  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;
    const user = collection(this.firestore, 'users');
    addDoc(user, this.user.toJson());
    this.loading = false;
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
