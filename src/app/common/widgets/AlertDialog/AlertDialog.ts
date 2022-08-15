import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-AlertDialog',
  templateUrl: './AlertDialog.html',
  styleUrls: ['./AlertDialog.css']
})
export class AlertDialog implements OnInit {

  constructor(  public dialogRef: MatDialogRef < AlertDialog > ,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData) { 
    }

  ngOnInit() {
  }

  public static open(dialog: MatDialog, content: string, title ? : string): MatDialogRef < AlertDialog > {
    const dialogRef = dialog.open(AlertDialog, {
      width: '700px',
      data: {
        title: title,
        content: content
      },
    });

    return dialogRef;

  }
}

export class AlertDialogData{
  title!:string;
  content!:string;
}