# Projektarbeit „Webseite und Datenbank für einen Sportverein“

### Themengebiete für das Fachgespräch (Auswahl)

- **Grundlagen des http-Protokolls** <br/><br/>
  - Steht für HyperText Transfer Protocol
  - Regelt die Datenübertragung zwischen Anwendungen, hauptsächlich im Webbereich
  - Basiert auf ein Fragen<>Antwort Schema:
    - Browser sendet eine Anfrage (Request), und bekommt eine Response (Response) vom Server
    - Server sendet aber nie von sich aus
  - HTTP ist ein zustandsloses Protokoll, d. h., 
    dass die Verbindung nach jeder Antwort unterbrochen und bei einer weiteren Anfrage erneut aufgebaut wird. 
     


- **Grundlagen HTML**
  - Tags (die wichtigsten sollten auch bekannt sein)
    -<html> </html> oder <!DOCTYPE html> </html> 	Definiert ein HTML-Dokument und bildet somit das Rahmengerüst.
    <head> </head> 	Definierter Bereich am Anfang eines Dokuments, in welchem insbesondere der Titel vorkommt.
    <title> </title> 	Benennt einen Titel und muss im Header genannt werden.
    <body> </body> 	Alles, was nicht in den Header kommt, gehört in den Body des Dokuments. Im Allgemeinen alles, was nicht der Titel ist.
    <!-- Kommentar -->  
    <h1> </h1> 	Hauptüberschrift, definiert durch Schriftgröße.
    <h2> </h2> bis <h6> </h6> 	Zwischenüberschriften, die in absteigender Reihenfolge verwenden werden sollten.
    <p> </p> 	Bildet einen Absatz. In HTML5 kannst du das </p> weglassen und vor jeden deiner Absätze einfach nur ein <p> schreiben.
    <br> 	Erzwingt einen Zeilenumbruch.
    <hr> 	Erzeugt eine Trennlinie.
    <table> </table> 	Erzeugt eine Tabelle.
    <li> </li> Erzeugt einen Aufzählungspunkt, wenn es in einem <ol> oder <ul> Tag drin ist.
    <b> </b> 	Schrift wird fett angezeigt.
    <i> </i> 	Schrift wird kursiv angezeigt.
    <u> </u> 	Schrift wird unterstrichen angezeigt.
    <s> </s> 	Schrift wird durchgestrichen angezeigt.
    <sup> </sup> 	Erzeugt hochgestellte Zeichen, wie etwa x2.
    <sub> </sub> 	Erzeugt tiefgestellte Buchstaben, wie etwa H2O.
    
	
  - Attribute<br/><br/>
    - HTML-Attribute wie src, href und data bringen zusätzliche Informationen in ein HTML-Tag. 
      Ein a-Tag braucht die Zieladresse oder URL zur verlinkten Webseite. 
      Das img-Tag funktioniert nur mit dem Pfad zur Bilddatei. width und height sorgen für die Passform von Bildern.
  
 
- **HTML / CSS – Trennung von Design und Inhalt** <br/><br/>
  - Das Design wird in eine eigene Datei ausgelagert
  - Kann aber auch über den Style Attribut direkt in der HTML definiert werden
  - Kann für alle Seiten eines Internetauftritts verwendet werden.
  - Vorteil: Wird eine Änderung am Design gemacht, sind durch diese gemeinsame CSS Datei sorort alle Einzelseiten auf dem neuesten STand.
  
  Warum? Um Webseiten möglichst effizient und einfach zu entwickeln sowie sie nachträglich mit geringem Aufwand pflegen zu können, sollten diese Aufgaben strikt          voneinander getrennt werden: 
  
- **Grundlagen von Formularen**
  - Die wichtigsten Formularelemente <br/><br/>
    - Einzeilige und mehrzeilige Textfelder zur Eingabe 
      (INPUT mit dem Attribut type="text" sowie mit dem Attribut type="password" für Passwörter und TEXTAREA)
    - Elemente für Datei-Uploads (INPUT mit dem Attribut type="file")
    - Auswahllisten (SELECT und OPTION)
    - Radiobuttons zur Entweder/Oder-Auswahl (<input type="radio">)
    - Checkboxen zur Sowohl/Als auch-Auswahl (<input type="checkbox">)
    - Sowie die Schaltflächen-Elemente (Buttons) zum Übergeben von Daten an den Server und zum Löschen von Formularen:
    input type="submit"
    input type="reset"
    input type="image"
    input type="button" sowie:
    button
  
  
- **Serverseitige Verarbeitung von Formularen**
  
  - $\_GET und $\_POST
    - Wird verwendet um Werte von einer Seite zur nächsten übertragen,
    - Möchte man Beispielsweise die Benutzereingabe eines Formulars an ein Script übertragen, diese überprüfen und abspeichern. Dann erfolgt dies entweder             mittels $_GET oder $_POST.
  
  - Was passiert, wenn der submit-Button gedrückt wird<br/><br/>
    - Mit dem Button type="submit" können Daten an die Anwendung abgesendet werden.
    - Ein Klick auf einen Button type="submit" löst innerhalb eines Formulars standardmäßig das Neuladen der Seite aus, wobei alle eingegebenen Daten verloren         gehen.
  
  
- **Grundlagen des PHP-Interpreters** <br/><br/>
  - Englisch Copy&Paste: PHP language is written in C and the way it works is actually quite cool.
    The php interpreter would read text files containing php code, analyse its syntax, transform everything it understands as php code into opcodes and later on     execute this opcode list.
    In simple terms, php will: parse, compile and execute.
  - Deutsch: Der PHP-Interpreter liest Textdateien mit PHP-Code, analysiert die Syntax, wandelt alles, was er als PHP-Code versteht, in Opcodes um und führt         diese Opcode-Liste später aus.
    Vereinfacht ausgedrückt: PHP parst, kompiliert und führt anschließend aus. 

- **Grundlagen von PHP**
  - Syntax
    - Orientieren sich an den so genannten Semikolonsprachen wie C++ oder Java.
    

  - Datenstrukturen
	- string, int, usw.
  
  - Einfache Kontrollstrukturen
  If Else switch case try catch loops 
  Eine Kontrollstruktur ermöglicht es Ihnen, den Ablauf der Codeausführung in Ihrer Anwendung zu steuern. 
  Im Allgemeinen wird ein Programm zeilenweise nacheinander ausgeführt, und eine Steuerungsstruktur ermöglicht es Ihnen, 
  diesen Ablauf zu ändern, normalerweise abhängig von bestimmten Bedingungen.
  - Sessions <br/><br/>
  
 
  
  SOAP
  Simple Object Access Protocol
  - Ist ein Netzwerkprotokoll, mit dessen Hilfe Daten zwischen Systemen ausgetauscht werden können
  - Handelt sich um ein von Microsoft entwickeltes XML-basiertes Netzwerkprotokoll.
  - SOAP ist Plattform- und sprachunabhängig
  
  REST oder auch Restful
  -	Representational State Transfer
  - Unterliegt den Beschränkungen der REST-Architektur 
  - Ermöglich  Interaktionen mit RESTful Webservices
  - Ist Zustandslos d. h. auf dem Server werden zwischen den Anforderungen keine Client-Inhalte gespeichert.
  - Statt dessen werden Informationen zum Session-Status beim Client gespeichert.

  
