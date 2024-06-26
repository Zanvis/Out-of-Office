[ENG]
You are able to add employees, edit their data, delete them. By clicking on the header, you can also sort at will. There are filters. The rest of the functionality also works. I made a basic system of roles, the selection is remembered even after refreshing the page.

To start the program you need to turn on the server and launch the site. 
1. Go to the backend folder and type 'node server.js' (having administrator rights).
2. Then go to the frontend folder and type 'ng serve' (using Angular CLI)

Of course, beforehand, create a database with the appropriate tables. I used xampp and sql

[PL]
Jesteś w stanie dodać pracowników, edytować ich dane, usuwać. Klikając na nagłówek można też dowolnie sortować. Są filtry. Reszta funkcjonalności również działa. Zrobiłem podstawowy system ról, wybór jest zapamiętywany nawet po odświeżeniu strony.

Aby włączyć program trzeba włączyć server i uruchomić stronę. 
1. Należy przejść do folderu backend i wpisać 'node server.js' (mając prawa administratora).
2. Następnie przejść do folderu frontend i wpisać 'ng serve' (używając Angular CLI)

Oczywiście uprzednio należy utworzyć bazę danych z odpowiednimi tabelami. Ja użyłem xampp i sql.

![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/dc0cc81f-b901-46c7-b2c3-9e4137d2d3a8)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/f41d5567-6837-4268-b8f3-cb47cd3a1305)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/5c5e8f31-de0f-496f-b7ce-1d6bd2dfc2ea)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/c0f511c5-ecce-4255-87f5-caf90ebcd985)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/190640fe-9baf-43ec-944d-138fb4cbbb03)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/39c4ca7b-3348-49e5-9f4f-89c9113c91e4)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/cd5416ad-5e74-4881-9a39-1625d7f7be23)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/35f60b50-10be-4393-b377-d8ff0ab9ed5b)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/148bc4a4-dc91-411c-a5a3-dfeba1aec0fa)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/35881d62-2b4d-4211-9b5f-3596b156480b)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/526d28b0-e853-4f95-8a8d-a6afeca81ca1)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/cf62aa4c-9ec5-4b61-a072-4fb7d48a3063)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/c79f4b16-6a18-44ce-b074-95a0dfeaa074)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/b7fbb879-b969-4e94-92a6-029acf4adf5b)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/0aae8919-74e1-4095-b237-ffebf25b4b8a)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/9378872c-41b3-4749-b474-b8a772b61f54)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/815a511b-e92d-4abc-b9ce-d6639dc36a56)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/05a71f1d-afe9-4d36-ae72-1f9ec7f7a354)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/3829b739-af6a-4740-a8ad-29ebba3b4fd3)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/cbb7a9ed-00f2-4b83-bcbd-b46193ec0259)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/f6c60e92-0515-4cb6-a54f-0d16a52649ca)

CREATE DATABASE out_of_office

CREATE TABLE employees (
ID INT PRIMARY KEY AUTO_INCREMENT,
FullName TEXT NOT NULL,
Subdivision TEXT NOT NULL,
Position TEXT NOT NULL,
Status TEXT NOT NULL,
PeoplePartner INT NOT NULL,
OutOfOfficeBalance INT NOT NULL,
Photo BLOB
);

CREATE TABLE leaverequests (
ID INT PRIMARY KEY AUTO_INCREMENT,
Employee INT NOT NULL,
AbsenceReason TEXT NOT NULL,
StartDate DATE NOT NULL,
EndDate DATE NOT NULL,
Comment TEXT,
Status TEXT NOT NULL,
FOREIGN KEY (Employee) REFERENCES employees(ID)
);

CREATE TABLE approvalrequests (
ID INT PRIMARY KEY AUTO_INCREMENT,
Approver INT NOT NULL,
LeaveRequest INT NOT NULL,
Status TEXT NOT NULL,
Comment TEXT,
FOREIGN KEY (Approver) REFERENCES employees(ID),
FOREIGN KEY (LeaveRequest) REFERENCES leaverequests(ID)
);


CREATE TABLE projects (
ID INT PRIMARY KEY AUTO_INCREMENT,
ProjectType TEXT NOT NULL,
StartDate DATE NOT NULL,
EndDate DATE,
ProjectManager INT NOT NULL,
Comment TEXT,
Status TEXT NOT NULL,
FOREIGN KEY (ProjectManager) REFERENCES employees(ID)
);
