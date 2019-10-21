import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student } from './pages/students/shared/student.model';

export class InMemoryDatabase implements InMemoryDbService {
	createDb() {
		const students: Student[] = [
            { id: 1, name: 'João', birth: new Date(2019, 7, 19) } as Student,
            { id: 1, name: 'Maria', birth: new Date(2019, 7, 21) } as Student,
            { id: 1, name: 'Nicolas', birth: new Date(2019, 7, 23) } as Student,
            { id: 1, name: 'Alice', birth: new Date(2019, 7, 25) } as Student,
            { id: 1, name: 'Caroline', birth: new Date(2019, 8, 26) } as Student,
            { id: 1, name: 'Leonardo', birth: new Date(2019, 9, 19) } as Student,
            { id: 1, name: 'Patrick', birth: new Date(2019, 11, 23) } as Student,
            { id: 1, name: 'Carlos', birth: new Date(2019, 5, 19) } as Student,
            { id: 1, name: 'Laura', birth: new Date(2019, 7, 19) } as Student
		  ]

		return { students };
	}
}
