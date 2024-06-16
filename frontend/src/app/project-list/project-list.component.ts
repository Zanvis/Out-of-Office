import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Project } from '../Models/project.model';
import { ProjectService } from '../project.service';
import { EMPTY, catchError } from 'rxjs';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit{
  projects: Project[] = [];
  sortBy: string = 'ID'; // Default sort by ID
  sortDirection: number = 1

  constructor(private projectService: ProjectService, private router: Router) { }

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
    this.router.navigate(['/edit-project', id]);
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
}
