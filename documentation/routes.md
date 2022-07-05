Member:
getMembers = 'http://localhost/index.php/member/get'
deleteMember = 'http://localhost/index.php/member/delete/{id}' also /delete/ aufrufen mit der ID als /delete/1 oder /delete/24 ...
putMember = 'http://localhost/index.php/member/edit' mit nachfolgendem Objekt als Body (in JSON Form) übergeben im Request

<!-- {
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
} -->

Login:
getToken = 'http://localhost/login.php/getToken?username=USERNAME&password=PASSWORD'
addUser = 'http://localhost/login.php/addUser?username=USERNAME&password=PASSWORD'
