import { Observable } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user = new User();
  users$: Observable<any>;
  allUsers: Array<any> = [];

  firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    const user = collection(this.firestore, 'users');
    this.users$ = collectionData(user);

    this.users$.subscribe((changes: any) => {
      console.log('Received changes from Database', changes);
      this.allUsers = changes;
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
