import { Component, OnInit } from '@angular/core';
import { Student } from '../shared/student.model';
import { StudentService } from '../shared/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss']
})
export class StudentsFormComponent implements OnInit {

  currenctAction:   string;
  studentForm:      FormGroup;
	pageTitle:        string;
	serverErrorMessages: string[] = null;
	submittingForm: boolean = false;
	student: Student = new Student();
	
	constructor(
		private studentService: StudentService,
		private route: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder
	) { }
	
	ngOnInit() {
		this.setCurrentAction();
		this.buildStudentForm();
		this.loadStudent();
	}

	ngAfterContentChecked() {
		this.setPageTitle();
	}

	submitForm() {
		this.submittingForm = true;
		if (this.currenctAction == 'new') {
			this.createStudent();
		} else {
			this.updateStudent();
		}
	}



	private setCurrentAction() {
		if (this.route.snapshot.url[0].path == 'new') {
			this.currenctAction = 'new';
		} else {
			this.currenctAction = 'edit';
		}
	}

	private buildStudentForm() {
		this.studentForm = this.formBuilder.group({
			id: [null],
			name: [null, [Validators.required, Validators.minLength(2)]],
			birth: [null]
		})
	}

	private loadStudent() {
		if (this.currenctAction == 'edit') {
			this.route.paramMap.pipe(
				switchMap(params => this.studentService.getById(+params.get('id')))
			).subscribe(
				(student) => {
					this.student = student;
					this.studentForm.patchValue(this.student);
				},
				(error) => alert('Ocorreu um erro no servidor, tente mais tarde')
			);
		}
	}

	private setPageTitle() {
		if (this.currenctAction == 'new') {
			this.pageTitle = 'Cadastro de Novo Estudante';
		} else {
			const studentName = this.student.name || '';
			this.pageTitle = 'Editando Estudante: ' + studentName;
		}
	}

	private createStudent() {
		const student: Student = Object.assign(new Student(), this.studentForm.value);

		this.studentService.create(student).subscribe(
			(student) => {
				this.actionsFormSuccess(student)
			},
			(error) => {
				this.actionsForError(error)
			}
		);
	}

	private updateStudent() {
		const student: Student = Object.assign(new Student(), this.studentForm.value);

		this.studentService.update(student).subscribe(
			(student) => {
				this.actionsFormSuccess(student)
			},
			(error) => {
				this.actionsForError(error)
			}
		);
	}

	private actionsFormSuccess(student: Student) {
		toastr.success('Solicitação processada com sucesso.');

		this.router.navigateByUrl('students', { skipLocationChange: true }).then(
			() => {
				this.router.navigate(['students', student.id, 'edit']);
			}
		);
	}

	private actionsForError(error) {
		toastr.error('Ocorreu um erro ao processar a sua solicitação.');

		this.submittingForm = false;

		if (error.status === 422) {
			this.serverErrorMessages = JSON.parse(error._body).errors;
		} else {
			this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente mais tarde'];
		}
	}
}
