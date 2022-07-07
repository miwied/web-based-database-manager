import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  showSnackBar(
    text: string,
    _horizontalPosition: MatSnackBarHorizontalPosition,
    _verticalPosition: MatSnackBarVerticalPosition,
    color: string
  ) {
    this._snackBar.open(text, 'X', {
      horizontalPosition: _horizontalPosition,
      verticalPosition: _verticalPosition,
      panelClass: [color],
      duration: 5000,
    });
  }
}
