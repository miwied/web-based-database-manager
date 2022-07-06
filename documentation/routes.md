Login:
getToken = 'http://localhost/login.php/getToken?username=USERNAME&password=PASSWORD'
createUser = 'http://localhost/login.php/createUser?username=USERNAME&password=PASSWORD'

Member:
putMember = 'http://localhost/index.php/member/edit' mit nachfolgendem Objekt als Body (in JSON Form) übergeben im Request
getMembers = 'http://localhost/index.php/member/get'
!!!existiert noch nicht createMember = 'http://localhost/index.php/member/create' mit nachfolgendem Objekt als Body (in JSON Form) übergeben im Request (ohne memberId)
deleteMember = 'http://localhost/index.php/member/delete/{id}' also /delete/ aufrufen mit der ID als /delete/1 oder /delete/24 ...

Sport:
createSport = 'http://localhost/index.php/sport/create' mit nachfolgendem Objekt als Body (in JSON Form) übergeben im Request (ohne sportId)
putSport = 'http://localhost/index.php/sport/edit' mit nachfolgendem Objekt als Body (in JSON Form) übergeben im Request
deleteSport = 'http://localhost/index.php/sport/delete/{id}' also /delete/ aufrufen mit der ID als /delete/1 oder /delete/24 ...

Team:
createTeam = 'http://localhost/index.php/team/create' mit nachfolgendem Objekt als Body (in JSON Form) übergeben im Request (ohne sportId)
putTeam = 'http://localhost/index.php/team/edit' mit nachfolgendem Objekt als Body (in JSON Form) übergeben im Request
deleteTeam = 'http://localhost/index.php/team/delete/{id}' also /delete/ aufrufen mit der ID als /delete/1 oder /delete/24 ...