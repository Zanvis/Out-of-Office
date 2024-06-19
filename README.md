[ENG]
I didn't manage to do all the functionality because I'm flying abroad for a week, and while away I'm not able to write the code fully. I did as much as I could, but I guarantee I can do more. You are able to add employees, edit their data, delete them. By clicking on the header, you can also sort at will. There are filters. The rest of the functionality also works, but do not include everything that was required. Due to my flight I am not able to refine everything, I am very sorry. In routing, I made it possible to go to all functionalities. I made a basic system of roles, the selection is remembered even after refreshing the page. I didn't manage to enable storing the photo, as a result, it displays as if it didn't load. I did as much as I could in such a short period of time, because the same day that I got the task, I flew abroad. That's why it looks so raw. If I had time, I would refine the look with CSS, Material UI or bootstrap. I added some new features on my trip thanks to my laptop.

To start the program you need to turn on the server and launch the site. 
1. Go to the backend folder and type 'node server.js' (having administrator rights).
2. Then go to the frontend folder and type 'ng serve' (using Angular CLI)

Of course, beforehand, create a database with the appropriate tables. I used xampp and sql

[PL]
Nie zdążyłem zrobić wszystkich funkcjonalności, ponieważ lecę za granicę na tydzień, a na wyjeździe nie jestem w stanie napisać kodu w pełni. Zrobiłem tyle, ile byłem w stanie, ale gwarantuję, że potrafię więcej. Jesteś w stanie dodać pracowników, edytować ich dane, usuwać. Klikając na nagłówek można też dowolnie sortować. Są filtry. Reszta funkcjonalności również działa, lecz nie zawierają wszystkiego, co było wymagane. Przez mój lot nie jestem w stanie wszystkiego dopracować, bardzo przepraszam. W routingu umożliwiłem przejście do wszystkich funkcjonalności. Zrobiłem podstawowy system ról, wybór jest zapamiętywany nawet po odświeżeniu strony. Nie zdążyłem umożliwić przechowywania zdjęcia, w związku z tym wyświetla się tak, jakby się nie wczytało. Zrobiłem tyle, ile byłem w stanie w tak krótkim czasie, ponieważ tego samego dnia, co dostałem zadanie, wylatuję za granicę. Dlatego też wygląda to tak surowo. Jakbym miał czas, to dopracowałbym wygląd za pomocą CSS, Materiał UI lub bootstrap. Dodałem kilka nowych rzeczy na wyjeździe dzięki mojemu laptopowi.

Aby włączyć program trzeba włączyć server i uruchomić stronę. 
1. Należy przejść do folderu backend i wpisać 'node server.js' (mając prawa administratora).
2. Następnie przejść do folderu frontend i wpisać 'ng serve' (używając Angular CLI)

Oczywiście uprzednio należy utworzyć bazę danych z odpowiednimi tabelami. Ja użyłem xampp i sql.

![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/934f5d40-f845-439a-9327-c75f27bfcae7)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/73996c19-3af0-4809-b2c7-0dbb8d536895)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/8a18a89b-b1be-4594-832d-dcc92b100a93)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/6b4108ab-a466-4ac1-b010-7b62f64e8eb5)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/fb5c50df-7d1f-4946-b17a-808c935f8828)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/ce71c818-7f4a-4d63-80fc-2895e0c15a5f)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/f1dbfea9-ea0b-428c-8268-d2dbc98f8288)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/9710ba55-66d0-456a-8e74-7930a0b48116)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/2d0bba2a-5a4b-4ab2-b5f1-1b7e4043d1df)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/eb74502b-6022-410d-8060-28c3790c4d2a)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/dfe6adfe-4ebd-4c79-842f-833768b0971d)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/00f2ebc2-0364-4008-9628-c134ecedc164)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/a11c5a25-77c8-4071-b62b-f48aae62dead)
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
