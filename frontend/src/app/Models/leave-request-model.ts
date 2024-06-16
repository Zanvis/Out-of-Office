export interface LeaveRequest {
    ID: number;
    Employee: number;
    AbsenceReason: string;
    StartDate: Date;
    EndDate: Date;
    Comment: string;
    Status: string;
}
