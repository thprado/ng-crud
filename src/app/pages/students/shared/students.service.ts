import { Student } from './student.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

    private apiPath: string = 'api/students';

    constructor(private http: HttpClient) {
    }

    getById(id: number): Observable<Student> {
        const url = `${this.apiPath}/${id}`;

        return this.http.get(url).pipe(
            catchError(this.handleError),
            map(this.jsonDataToStudent)
        );
    }

    getAll(): Observable < Student[] > {
        return this.http.get(this.apiPath).pipe(
            catchError(this.handleError),
            map(this.jsonDataToStudents)
        );
    }

    create(student: Student): Observable<Student> {
        return this.http.post(this.apiPath, student).pipe(
            catchError(this.handleError),
            map(this.jsonDataToStudent)
        );
    }

    update(student: Student): Observable<Student> {
        const url = `${this.apiPath}/${student.id}`;

        return this.http.put(url, student).pipe(
            catchError(this.handleError),
            map(() => student)
        );
    }

    delete(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`;

        return this.http.delete(url).pipe(
            catchError(this.handleError),
            map(() => null)
        );
    }

    private jsonDataToStudents(jsonData: any[]): Student[] {
        const students: Student[] = [];
        jsonData.forEach(element => students.push(element as Student));
        return students;
    }

    private jsonDataToStudent(jsonData: any[]): Student {
        return jsonData as Student;
    }

    private handleError(error: any): Observable<any> {
        console.log('erro na requisição', error);

        return throwError(error);
    }
}