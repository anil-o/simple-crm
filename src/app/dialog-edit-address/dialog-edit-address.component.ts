import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
  
  user: User;
  loading = false;
  firestore: Firestore = inject(Firestore);
  users$: Observable<any>;
  allUsers: Array<any> = [];

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) { }

  ngOnInit(): void {
    
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
