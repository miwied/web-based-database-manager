### Login:
 - **createUser**<br />
 'http://localhost/login.php/createUser?username=USERNAME&password=PASSWORD'
 - **getToken**<br />
 'http://localhost/login.php/getToken?username=USERNAME&password=PASSWORD'
 
### Member:
- **createMember**<br />
'http://localhost/index.php/member/create'<br />
(mit nachfolgendem Json-Objekt als Body übergeben im Request (ohne memberId))
- **getMembers**<br />
'http://localhost/index.php/member/get'<br />
- **putMember** <br />
'http://localhost/index.php/member/edit' <br />
(mit nachfolgendem Json-Objekt als Body übergeben im Request)
- **deleteMember**<br />
'http://localhost/index.php/member/delete/{id}'<br />
(also /delete/ aufrufen mit der ID z.B.: /delete/22)

### Sport:
 - **createSport**<br />
 'http://localhost/index.php/sport/create'<br />
 (mit nachfolgendem Json-Objekt als Body übergeben im Request (ohne sportId))
 - **putSport**<br />
http://localhost/index.php/sport/edit'<br />
(mit nachfolgendem JSON-Objekt als Body übergeben im Request)
 - **deleteSport**<br />
'http://localhost/index.php/sport/delete/{id}'<br />
(/delete/ aufrufen mit der ID z.B.: /delete/22)

### Team:
 - **createTeam**<br />
'http://localhost/index.php/team/create'<br />
(mit nachfolgendem JSON-Objekt als Body übergeben im Request (ohne teamId))
 - **putTeam**<br />
'http://localhost/index.php/team/edit'<br />
(mit nachfolgendem JSON-Objekt als Body übergeben im Request)
 - **deleteTeam**<br />
'http://localhost/index.php/team/delete/{id}'<br />
(/delete/ aufrufen mit der ID z.B.: /delete/22)
