export class Student {

	constructor(
		public id?: number,
		public name?: string,
		public birth?: Date
	) { }
	
	
	static fromJson(jsonData: any): Student {
		return Object.assign(new Student(), jsonData);
	}
}