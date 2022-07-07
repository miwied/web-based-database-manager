**'create-objects' are always the same as the 'edit-objects' only without the primary key.**

### Member:

_create-object:_

    {
      "firstName": "Gabi",
      "lastName": "Ziegler",
      "zipCode": "95326",
      "city": "Kulmbach",
      "gender": "w",
      "feeId": "1",
      "sportIds": [
        {
          "sa_id": "3"
        },
        {
          "sa_id": "5"
        },
        {
          "sa_id": "8"
        }
      ],
      "isPlayer": false,
      "playerTeamId": "0",
      "isTrainer": true,
      "trainerTeamId": "3",
    }

_edit-object:_

    {
      "memberId": "1",
      "firstName": "Gabi",
      "lastName": "Ziegler",
      "zipCode": "95326",
      "city": "Kulmbach",
      "gender": "w",
      "feeGroup": "Erwachsene",
      "fee": "75.00",
      "sportIds": [
        {
          "sa_id": "3"
        },
        {
          "sa_id": "5"
        },
        {
          "sa_id": "8"
        }
      ],
      "sports": [
        [
          {
            "abteilung": "Boxen",
            "beitrag": "15.00"
          }
        ],
        [
          {
            "abteilung": "Tennis",
            "beitrag": "100.00"
          }
        ],
        [
          {
            "abteilung": "Aerobic",
            "beitrag": "10.00"
          }
        ]
      ],
      "isPlayer": false,
      "playerTeamId": null,
      "playerTeamName": null,
      "isTrainer": true,
      "trainerTeamId": "4",
      "trainerTeamName": [
        {
          "teamname": "Wettkämpfer"
        }
      ]
    }

### Sport:

_edit-object:_

    {
      "sportId": "1",
      "name": "Fußball",
      "fee": "35",
      "leaderId": "4"
    }

### Team:

_edit-object:_

    {
      "teamId": "4",
      "sportsId": "6",
      "name": "ATS Hof West"
    }
