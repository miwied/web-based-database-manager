### Login:
 - **createUser**
 'http://localhost/login.php/createUser?username=USERNAME&password=PASSWORD'
 - **getToken**
 'http://localhost/login.php/getToken?username=USERNAME&password=PASSWORD'
 
### Member:
- **createMember**
'http://localhost/index.php/member/create'<br />
(mit nachfolgendem Json-Objekt als Body übergeben im Request (ohne memberId))
- **getMembers** 
'http://localhost/index.php/member/get'<br />
- **putMember** 
'http://localhost/index.php/member/edit' <br />
(mit nachfolgendem Json-Objekt als Body übergeben im Request)
- **deleteMember** 
'http://localhost/index.php/member/delete/{id}'<br />
(also /delete/ aufrufen mit der ID z.B.: /delete/22)

### Sport:
 - **createSport**
 'http://localhost/index.php/sport/create'<br />
 (mit nachfolgendem Json-Objekt als Body übergeben im Request (ohne sportId))
 - **putSport**
http://localhost/index.php/sport/edit'<br />
(mit nachfolgendem JSON-Objekt als Body übergeben im Request)
 - **deleteSport**
'http://localhost/index.php/sport/delete/{id}'<br />
(/delete/ aufrufen mit der ID z.B.: /delete/22)

### Team:
 - **createTeam**
'http://localhost/index.php/team/create'<br />
(mit nachfolgendem JSON-Objekt als Body übergeben im Request (ohne teamId))
 - **putTeam**
'http://localhost/index.php/team/edit'<br />
(mit nachfolgendem JSON-Objekt als Body übergeben im Request)
 - **deleteTeam**
'http://localhost/index.php/team/delete/{id}'<br />
(/delete/ aufrufen mit der ID z.B.: /delete/22)
