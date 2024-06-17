import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private role: string = 'Employee';

    setRole(role: string): void {
        this.role = role;
    }

    getRole(): string {
        return this.role;
    }
}
