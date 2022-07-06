import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { SportsClubApiService } from 'src/app/services/sportsClub-api.service';

@Component({
  selector: 'app-member-delete-dialog',
  templateUrl: './member-delete-dialog.component.html',
  styleUrls: ['./member-delete-dialog.component.css'],
})
export class MemberDeleteDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<MemberDeleteDialogComponent>,
    private apiService: SportsClubApiService,
    private dataSharingService: DataSharingService,
    private snackBarService: SnackBarService
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    this.apiService.deleteMember(this.data.member.memberId).subscribe({
      next: () => {
        this.dialogRef.close();
        this.snackBarService.showSnackBar(
          'Das Mitglied wurde erfolgreich gelöscht',
          'left',
          'bottom',
          'snackbar-success'
        );
        this.dataSharingService.delete(this.data.member.memberId);
      },
    });
  }

  ngOnInit(): void {}
}
