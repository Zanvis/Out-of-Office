import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private readonly roleKey = 'userRole';
    private role: string;

    constructor(@Inject(DOCUMENT) private document: Document) {  
        const localStorage = this.document.defaultView?.localStorage;
        const storedRole = localStorage?.getItem(this.roleKey);
        this.role = storedRole ? storedRole : 'Employee';
    }

    setRole(role: string): void {
        this.role = role;
        localStorage.setItem(this.roleKey, role);
    }

    getRole(): string {
        return this.role;
    }

    clearRole(): void {
        this.role = 'Employee';
        localStorage.removeItem(this.roleKey);
    }

}
