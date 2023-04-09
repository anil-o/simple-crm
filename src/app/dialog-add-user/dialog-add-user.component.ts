import { Component, OnInit, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  user = new User();
  birthDate: Date;
  loading = false;
  user$: Observable<any>;

  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {

  }

  ngOnInit(): void {
   
  }

 async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;
    const user = collection(this.firestore, 'users');
    let result = await addDoc(user, this.user.toJson());
    this.addCustomIdName(result, user);
    this.loading = false;
    this.closeDialog();
  }

  addCustomIdName(result, user) {
    const docRef = doc(user, result['id']);
    this.user.customIdName = result['id'];
    updateDoc(docRef, this.user.toJson());
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
