import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from './role.service';

export const roleGuard = () => {
    const roleService = inject(RoleService);
    const router = inject(Router);
    const role = roleService.getRole();
    if (role) {
        return true;
    } else {
        router.navigate(['/']);
        return false;
    }
};
