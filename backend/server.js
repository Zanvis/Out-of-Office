const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const upload = multer();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'out_of_office'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Get all employees
app.get('/Lists/Employees', (req, res) => {
    db.query('SELECT * FROM Employees', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.post('/Lists/Employees/:id/photo', upload.single('photo'), (req, res) => {
    const { id } = req.params;
    const photo = req.file.buffer; 

    db.query('UPDATE Employees SET Photo = ? WHERE ID = ?', [photo, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({ message: 'Photo uploaded successfully' });
        }
    });
});

// Get employee by ID
app.get('/Lists/Employees/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Employees WHERE ID = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results[0]);
        }
    });
});

// Create a new employee
app.post('/Lists/Employees', (req, res) => {
    const employee = req.body;
    db.query('INSERT INTO Employees SET ?', employee, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send({ id: results.insertId, ...employee });
        }
    });
});

// Update an employee
app.put('/Lists/Employees/:id', (req, res) => {
    const { id } = req.params;
    const employee = req.body;
    db.query('UPDATE Employees SET ? WHERE ID = ?', [employee, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({ id, ...employee });
        }
    });
});

// Delete an employee
app.delete('/Lists/Employees/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Employees WHERE ID = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({ message: 'Employee deleted', id });
        }
    });
});

app.get('/Lists/ApprovalRequests', (req, res) => {
    const sql = 'SELECT * FROM ApprovalRequests';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching approval requests:', err);
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Endpoint to create approval request
// app.post('/approval-requests', (req, res) => {
//     const { approver, leaveRequestId, status, comment } = req.body;

//     const sql = 'INSERT INTO ApprovalRequests (Approver, LeaveRequest, Status, Comment) VALUES (?, ?, ?, ?)';
//     db.query(sql, [approver, leaveRequestId, status, comment], (err, result) => {
//         if (err) {
//             console.error('Error creating approval request:', err);
//             res.status(500).send(err);
//         } else {
//             // res.status(201).send({ id: result.insertId });
//             res.status(201).send({ id: result.insertId, approver, leaveRequestId, status, comment });
//         }
//     });
// });
// Endpoint to create approval request
app.post('/Lists/ApprovalRequests', (req, res) => {
    const { Approver, LeaveRequest, Status, Comment } = req.body;
    const sql = 'INSERT INTO ApprovalRequests (Approver, LeaveRequest, Status, Comment) VALUES (?, ?, ?, ?)';
    db.query(sql, [Approver, LeaveRequest, Status, Comment], (err, result) => {
    if (err) {
        console.error('Error creating approval request:', err);
        res.status(500).send(err);
    } else {
        res.status(201).send({ id: result.insertId, Approver, LeaveRequest, Status, Comment });
    }
    });
});
// Endpoint to get approval requests by approver (HR manager or project manager)
app.get('/Lists/ApprovalRequests/:approverId', (req, res) => {
    const { approverId } = req.params;
    const sql = 'SELECT ar.*, lr.Employee, lr.AbsenceReason, lr.StartDate, lr.EndDate FROM ApprovalRequests ar INNER JOIN LeaveRequests lr ON ar.leaveRequest = lr.ID WHERE ar.approver = ?';
    db.query(sql, [approverId], (err, results) => {
        if (err) {
            console.error('Error fetching approval requests:', err);
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Endpoint to get all leave requests
app.get('/Lists/LeaveRequests', (req, res) => {
    const sql = 'SELECT * FROM LeaveRequests';
    db.query(sql, (err, results) => {
        if (err) {
            handleQueryError(res, err);
        } else {
            res.json(results);
        }
    });
});

// Endpoint to get a specific leave request by ID
// app.get('/Lists/LeaveRequests/:id', (req, res) => {
//     const { id } = req.params;
//     const sql = 'SELECT * FROM LeaveRequests WHERE ID = ?';
//     db.query(sql, [id], (err, results) => {
//         if (err) {
//             handleQueryError(res, err);
//         } else if (results.length === 0) {
//             res.status(404).send({ message: 'Leave request not found' });
//         } else {
//             res.json(results[0]);
//         }
//     });
// });

// Endpoint to create a new leave request
// app.post('/Lists/LeaveRequests', (req, res) => {
//     const { Employee, AbsenceReason, StartDate, EndDate, Comment, Status } = req.body;
//     const sql = 'INSERT INTO LeaveRequests (Employee, AbsenceReason, StartDate, EndDate, Comment, Status) VALUES (?, ?, ?, ?, ?, ?)';
//     db.query(sql, [Employee, AbsenceReason, StartDate, EndDate, Comment, Status], (err, result) => {
//         if (err) {
//             handleQueryError(res, err);
//         } else {
//             res.status(201).send({ id: result.insertId, Employee, AbsenceReason, StartDate, EndDate, Comment, Status });
//         }
//     });
// });


app.post('/Lists/LeaveRequests', (req, res) => {
    const leaveRequest = req.body;
    leaveRequest.Status = 'New'
    db.query('INSERT INTO LeaveRequests SET ?', leaveRequest, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send({ id: results.insertId, ...leaveRequest });
        }
    }); 
});

// // Endpoint to update an existing leave request
// app.put('/Lists/LeaveRequests/:id', (req, res) => {
//     const { id } = req.params;
//     const { Employee, AbsenceReason, StartDate, EndDate, Comment, Status } = req.body;
//     const sql = 'UPDATE LeaveRequests SET Employee = ?, AbsenceReason = ?, StartDate = ?, EndDate = ?, Comment = ?, Status = ? WHERE ID = ?';
//     db.query(sql, [Employee, AbsenceReason, StartDate, EndDate, Comment, Status, id], (err, result) => {
//         if (err) {
//             handleQueryError(res, err);
//         } else {
//             res.send({ id, Employee, AbsenceReason, StartDate, EndDate, Comment, Status });
//         }
//     });
// });

app.get('/Lists/LeaveRequests/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM LeaveRequests WHERE ID = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results[0]);
        }
    });
});

app.put('/Lists/LeaveRequests/:id', (req, res) => {
    const { id } = req.params;
    const leaveRequest = req.body;
    db.query('UPDATE LeaveRequests SET ? WHERE ID = ?', [leaveRequest, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({ id, ...leaveRequest });
        }
    });
});

// Delete an employee
app.delete('/Lists/LeaveRequests/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM LeaveRequests WHERE ID = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({ message: 'LeaveRequests deleted', id });
        }
    });
});

// // Endpoint to delete a leave request
// app.delete('/Lists/LeaveRequests/:id', (req, res) => {
//     const { id } = req.params;
//     const sql = 'DELETE FROM LeaveRequests WHERE ID = ?';
//     db.query(sql, [id], (err, result) => {
//         if (err) {
//             handleQueryError(res, err);
//         } else {
//             res.send({ message: 'Leave request deleted', id });
//         }
//     });
// }); 

app.get('/Lists/Projects', (req, res) => {
    const sql = 'SELECT * FROM Projects';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching projects:', err);
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Get a specific project by ID
app.get('/Lists/Projects/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Projects WHERE ID = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error fetching project:', err);
            res.status(500).send(err);
        } else if (results.length === 0) {
            res.status(404).send({ message: 'Project not found' });
        } else {
            res.json(results[0]);
        }
    });
});

// Create a new project
app.post('/Lists/Projects', (req, res) => {
    const { ProjectType, StartDate, EndDate, ProjectManager, Comment, Status } = req.body;
    const sql = 'INSERT INTO Projects (ProjectType, StartDate, EndDate, ProjectManager, Comment, Status) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [ProjectType, StartDate, EndDate, ProjectManager, Comment, Status], (err, result) => {
        if (err) {
            console.error('Error creating project:', err);
            res.status(500).send(err);
        } else {
            res.status(201).send({ id: result.insertId, ProjectType, StartDate, EndDate, ProjectManager, Comment, Status });
        }
    });
});

// Update an existing project
app.put('/Lists/Projects/:id', (req, res) => {
    const { id } = req.params;
    const { ProjectType, StartDate, EndDate, ProjectManager, Comment, Status } = req.body;
    const sql = 'UPDATE Projects SET ProjectType = ?, StartDate = ?, EndDate = ?, ProjectManager = ?, Comment = ?, Status = ? WHERE ID = ?';
    db.query(sql, [ProjectType, StartDate, EndDate, ProjectManager, Comment, Status, id], (err, result) => {
        if (err) {
            console.error('Error updating project:', err);
            res.status(500).send(err);
        } else {
            res.send({ id, ProjectType, StartDate, EndDate, ProjectManager, Comment, Status });
        }
    });
});

// Delete a project
app.delete('/Lists/Projects/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Projects WHERE ID = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting project:', err);
            res.status(500).send(err);
        } else {
            res.send({ message: 'Project deleted', id });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
