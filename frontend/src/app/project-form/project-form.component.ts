import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent implements OnInit{
  projectForm: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projectForm = this.fb.group({
      ProjectType: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: [''],
      ProjectManager: ['', Validators.required],
      Comment: [''],
      Status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.projectsService.getProject(this.id).subscribe((data) => {
        this.projectForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      if (this.id) {
        this.projectsService.updateProject(this.id, this.projectForm.value).subscribe(() => {
          this.router.navigate(['/Lists/Projects']);
        });
      } else {
        this.projectsService.addProject(this.projectForm.value).subscribe(() => {
          this.router.navigate(['/Lists/Projects']);
        });
      }
    }
  }
}
