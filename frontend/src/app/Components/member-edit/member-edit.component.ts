import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBasicFee } from 'src/app/models/basicFees';
import { IMember } from 'src/app/models/member';
import { ISport } from 'src/app/models/sport';
import { ITeam } from 'src/app/models/team';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit, OnDestroy {
  @Input() member: IMember;
  gendersArray: string[] = ['Männlich', 'Weiblich', 'Divers'];
  sports: ISport[];
  teams: ITeam[];
  basicFees: IBasicFee[];

  sportsDataSubscription: Subscription;
  basicFeeDataSubscription: Subscription;
  teamsDataSubscription: Subscription;

  constructor(private dataSharingService: DataSharingService) {}

  ngOnInit(): void {
    this.dataSharingService.loadBasicFeeData();
    this.dataSharingService.loadTeamsData();
    this.sportsDataSubscription = this.dataSharingService.sportsData$.subscribe(
      {
        next: (sports) => {
          if (sports.length > 0) {
            this.sports = sports;
          }
        },
      }
    );
    this.basicFeeDataSubscription =
      this.dataSharingService.basicFeeData$.subscribe({
        next: (basicFees) => {
          if (basicFees.length > 0) {
            this.basicFees = basicFees;
          }
        },
      });
    this.teamsDataSubscription = this.dataSharingService.teamsData$.subscribe({
      next: (teams) => {
        if (teams.length > 0) {
          this.teams = teams;
        }
      },
    });
    console.log(this.member);
  }

  ngOnDestroy(): void {
    this.sportsDataSubscription.unsubscribe();
    this.basicFeeDataSubscription.unsubscribe();
    this.teamsDataSubscription.unsubscribe();
  }
}
