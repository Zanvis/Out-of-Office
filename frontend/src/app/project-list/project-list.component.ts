import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Project } from '../Models/project.model';
import { ProjectService } from '../project.service';
import { EMPTY, catchError } from 'rxjs';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit{
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  sortBy: string = 'ID'; // Default sort by ID
  sortDirection: number = 1

  constructor(private projectService: ProjectService, private router: Router, public roleService: RoleService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().pipe(
      catchError(error => {
        console.error('Error fetching projects:', error);
        return EMPTY;
      })
    ).subscribe(projects => {
      this.projects = projects;
      this.filteredProjects = projects;
      this.sortProjects();
    });
  }

  deleteProject(id: number): void {
    // if (confirm('Are you sure you want to delete this project?')) {
    //   this.projectService.deleteProject(id).subscribe(() => {
    //     this.projects = this.projects.filter(project => project.ID !== id);
    //   }, error => {
    //     console.error('Error deleting project:', error);
    //   });
    // }
    this.projectService.deleteProject(id).subscribe(() => {
      this.projects = this.projects.filter(request => request.ID !== id);
    });
  }

  editProject(id: number): void {
    this.router.navigate(['/Lists/Projects/edit', id]);
  }
  sortProjects(): void {
    this.projects.sort((a, b) => {
      const aValue = this.getPropertyValue(a, this.sortBy);
      const bValue = this.getPropertyValue(b, this.sortBy);

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortDirection * aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.sortDirection * (aValue - bValue);
      } else {
        return 0;
      }
    });
  }

  getPropertyValue(obj: any, propertyPath: string): any {
    return propertyPath.split('.').reduce((o, p) => o && o[p], obj);
  }

  onSort(column: string): void {
    if (this.sortBy === column) {
      this.sortDirection = -this.sortDirection;
    } else {
      this.sortBy = column;
      this.sortDirection = 1;
    }
    this.sortProjects();
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProjects = this.projects.filter((request) =>
      Object.values(request).some((value: any) =>
        value.toString().toLowerCase().includes(filterValue)
      )
    );
  }
  searchByRequestId(event: Event): void {
    const requestId = (event.target as HTMLInputElement).value;
    if (requestId) {
      this.filteredProjects = this.projects.filter(request =>
        request.ID === parseInt(requestId, 10)
      );
    } else {
      this.filteredProjects = [...this.projects];
    }
  }
}
