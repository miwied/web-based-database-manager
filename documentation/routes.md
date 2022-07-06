Member:
getMembers = 'http://localhost/index.php/member/get'
deleteMember = 'http://localhost/index.php/member/delete/{id}' also /delete/ aufrufen mit der ID als /delete/1 oder /delete/24 ...
!!!existiert noch nicht createMember = 'http://localhost/index.php/member/create' mit nachfolgendem Objekt als Body (in JSON Form) übergeben im Request (ohne memberId)
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

Sport:
deleteSport = 'http://localhost/index.php/sport/delete/{id}' also /delete/ aufrufen mit der ID als /delete/1 oder /delete/24 ...
createSport = 'http://localhost/index.php/sport/create' mit nachfolgendem Objekt als Body (in JSON Form) übergeben im Request (ohne sportId)
putSport = 'http://localhost/index.php/sport/edit' mit nachfolgendem Objekt als Body (in JSON Form) übergeben im Request

<!--
{
  "sportId": "1",
  "name": "Fußball";
  "fee": "35";
  "leaderId": "4";
}
-->

Team:
deleteTeam = 'http://localhost/index.php/team/delete/{id}' also /delete/ aufrufen mit der ID als /delete/1 oder /delete/24 ...
createTeam = 'http://localhost/index.php/team/create' mit nachfolgendem Objekt als Body (in JSON Form) übergeben im Request (ohne sportId)
putTeam = 'http://localhost/index.php/team/edit' mit nachfolgendem Objekt als Body (in JSON Form) übergeben im Request

<!--
{
  "teamId": "4";
  "sportsId": "6";
  "name": "Die Hurensöhne";
}
-->
