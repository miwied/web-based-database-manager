Login:
getToken = 'http://localhost/login.php/getToken?username=USERNAME&password=PASSWORD'
addUser = 'http://localhost/login.php/addUser?username=USERNAME&password=PASSWORD'

Member:
getMembers = 'http://localhost/index.php/member/get'
deleteMember = 'http://localhost/index.php/member/delete/{id}' also /delete/ aufrufen mit der ID als /delete/1 oder /delete/24 ...
!!!existiert noch nicht createMember = 'http://localhost/index.php/member/create' mit nachfolgendem Objekt als Body (in JSON Form) übergeben im Request (ohne memberId)
putMember = 'http://localhost/index.php/member/edit' mit nachfolgendem Objekt als Body (in JSON Form) übergeben im Request

Sport:
deleteSport = 'http://localhost/index.php/sport/delete/{id}' also /delete/ aufrufen mit der ID als /delete/1 oder /delete/24 ...
createSport = 'http://localhost/index.php/sport/create' mit nachfolgendem Objekt als Body (in JSON Form) übergeben im Request (ohne sportId)
putSport = 'http://localhost/index.php/sport/edit' mit nachfolgendem Objekt als Body (in JSON Form) übergeben im Request

Team:
deleteTeam = 'http://localhost/index.php/team/delete/{id}' also /delete/ aufrufen mit der ID als /delete/1 oder /delete/24 ...
createTeam = 'http://localhost/index.php/team/create' mit nachfolgendem Objekt als Body (in JSON Form) übergeben im Request (ohne sportId)
putTeam = 'http://localhost/index.php/team/edit' mit nachfolgendem Objekt als Body (in JSON Form) übergeben im Request