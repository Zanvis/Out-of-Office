[ENG]
I didn't manage to do all the functionality because I'm flying abroad for a week and I wouldn't have been able to write the code while away. I did as much as I could, but I guarantee I can do more. You are able to add employees, edit their details, delete them. By clicking on the header you can also sort as desired. The rest of the functionality only has a foundation, which would have been enough to refine, but I didn't make it in time before the flight, I'm very sorry. In routing, I have made it possible to go to unimplemented functionalities. I also didn't manage to enable image storage, so it displays as if it hasn't loaded. I have done as much as I could in such a short time, because I am flying abroad on the same day as I got the assignment. That's why it looks so raw. If I had the time, I would refine the look with CSS, Material UI or bootstrap.

[PL]
Nie zdążyłem zrobić wszystkich funkcjonalności, ponieważ lecę za granicę na tydzień, a na wyjeździe nie byłbym w stanie napisać kodu. Zrobiłem tyle, ile byłem w stanie, ale gwarantuję, że potrafię więcej. Jesteś w stanie dodać pracowników, edytować ich dane, usuwać. Klikając na nagłówek można też dowolnie sortować. Reszta funkcjonalności ma tylko podwaliny, które wystarczyłoby dopracować, lecz nie zdążyłem przez wylotem, bardzo przepraszam. W routingu umożliwiłem przejście do niezaimplementowanych funkcjonalności. Nie zdążyłem również umożliwić przechowywania zdjęcia, w związku z tym wyświetla się tak, jakby się nie wczytało. Zrobiłem tyle, ile byłem w stanie w tak krótkim czasie, ponieważ tego samego dnia, co dostałem zadanie, wylatuję za granicę. Dlatego też wygląda to tak surowo. Jakbym miał czas, to dopracowałbym wygląd za pomocą CSS, Materiał UI lub bootstrap.

![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/946aff7b-2ee4-441e-b3c4-674781cfb2ee)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/062f9fe0-c202-4654-ae35-c324ba864052)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/f6577070-4321-4c16-80b0-87f27e60fecc)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/a82a9aae-0406-4c51-9dda-3d2cba97781d)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/2acf0c2e-decf-41ef-98c3-35e305c88b47)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/27d448e1-8f17-422d-a5d2-1bc3d3dc6ba3)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/805ed1a9-248c-4c6a-8886-84e0d51b326a)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/35c731a7-19ae-4888-9490-2edeb24ec716)
![image](https://github.com/Zanvis/Out-of-Office/assets/161169953/f6c60e92-0515-4cb6-a54f-0d16a52649ca)

CREATE TABLE Employees (
    ID INTEGER PRIMARY KEY,
    FullName TEXT NOT NULL,
    Subdivision TEXT NOT NULL,
    Position TEXT NOT NULL,
    Status TEXT NOT NULL,
    PeoplePartner INTEGER NOT NULL,
    OutOfOfficeBalance INTEGER NOT NULL,
    Photo BLOB
);

CREATE TABLE LeaveRequests (
    ID INTEGER PRIMARY KEY,
    Employee INTEGER NOT NULL,
    AbsenceReason TEXT NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    Comment TEXT,
    Status TEXT NOT NULL,
    FOREIGN KEY (Employee) REFERENCES Employees(ID)
);

CREATE TABLE ApprovalRequests (
    ID INTEGER PRIMARY KEY,
    Approver INTEGER NOT NULL,
    LeaveRequest INTEGER NOT NULL,
    Status TEXT NOT NULL,
    Comment TEXT,
    FOREIGN KEY (Approver) REFERENCES Employees(ID),
    FOREIGN KEY (LeaveRequest) REFERENCES LeaveRequests(ID)
);

CREATE TABLE Projects (
    ID INTEGER PRIMARY KEY,
    ProjectType TEXT NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE,
    ProjectManager INTEGER NOT NULL,
    Comment TEXT,
    Status TEXT NOT NULL,
    FOREIGN KEY (ProjectManager) REFERENCES Employees(ID)
);