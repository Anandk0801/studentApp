
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule, NgFor],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;
  @ViewChild('subjectModel') model1: ElementRef | undefined;
  @ViewChild('viewModel') model2: ElementRef | undefined;
  subjectForm: FormGroup | any;
  studentObj: Student = new Student();
  studentList: Student[] = [];
  addSubject: any;
  searchKeyword: string = '';
  constructor(private fb: FormBuilder) {
    this.subjectForm = this.fb.group({
      course: ['', Validators.required],
      semester: ['', Validators.required],
      subject: (this.fb.array([])),
    });
  }
  subject(): FormArray {
    return this.subjectForm.get("subject") as FormArray;
  }
  newSubject(): FormGroup {
    return this.fb.group({
      subject: ''
    })
  }
  addMore() {
    this.subject().push(this.newSubject());
  }
  removeSubject(i: number) {
    this.subject().removeAt(i);
  }
  onSubmit() {
    console.log(this.subjectForm.value);
    localStorage.setItem('AddSubject', JSON.stringify(this.subjectForm.value))
    this.subjectForm.reset()
    this.closeSub()
  };
  get course() {
    return this.subjectForm.get('course')
  }

  get semester() {
    return this.subjectForm.get('semester')
  }
  ngOnInit(): void {
    const localData = localStorage.getItem("StudentList");
    if (localData != null) {
      this.studentList = JSON.parse(localData)
    }
  }
  openModel() {
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }
  closeModel() {

    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }
  addSub(_item: Student) {
    const model1 = document.getElementById("subjectModel");
    if (model1 != null) {
      model1.style.display = 'block'
    }
  }
  closeSub() {

    if (this.model1 != null) {
      this.model1.nativeElement.style.display = 'none';
    }
  }
  onDelete(_item: Student) {
    const isDelet = confirm("Are you sure want to Delete");
    if (isDelet) {
      const currentRecord = this.studentList.findIndex(m => m.id === this.studentObj.id);
      this.studentList.splice(currentRecord, 1);
      localStorage.setItem('StudentList', JSON.stringify(this.studentList));
    }
  }
  onEdit(item: Student) {
    this.studentObj = item;
    this.openModel();
  }
  onAdd() {
    this.openModel();
  }
  updateStudent() {
    const currentRecord = this.studentList.find(m => m.id === this.studentObj.id);
    if (currentRecord != undefined) {
      currentRecord.name = this.studentObj.name;
      currentRecord.address = this.studentObj.address;
      currentRecord.mobileNo = this.studentObj.mobileNo;
    };
    localStorage.setItem('StudentList', JSON.stringify(this.studentList));
    this.closeModel()
  }
  saveStudent() {

    const isLocalPresent = localStorage.getItem("StudentList");
    if (isLocalPresent != null) {

      const oldArray = JSON.parse(isLocalPresent);
      this.studentObj.id = oldArray.length + 1;
      oldArray.push(this.studentObj);
      this.studentList = oldArray;
      localStorage.setItem('StudentList', JSON.stringify(oldArray));

    } else {
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id = 1;
      this.studentList = newArr;
      localStorage.setItem('StudentList', JSON.stringify(newArr));
    }
    this.closeModel()
  }
  searchStudent() {
    if (this.searchKeyword.trim() !== '') {
      const filteredStudents = this.studentList.filter(student => {
        return student.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) || student.address.toLowerCase().includes(this.searchKeyword.toLowerCase())
      }
      );
      this.studentList = filteredStudents;
    } else {
      const localData = localStorage.getItem("StudentList");
      if (localData != null) {
        this.studentList = JSON.parse(localData);
      }
    }
  }
  clearSearch() {
    this.searchKeyword = '';
    const localData = localStorage.getItem("StudentList");
    if (localData != null) {
      this.studentList = JSON.parse(localData)
    }
  }
  uploadImage(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertImageToBase64(file)
        .then((base64String: string) => {
          this.studentObj.base64Image = base64String;
        })
        .catch((error: any) => {
          console.error('Error converting image to base64:', error);
        });
    }
  }
  convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

}
export class Student {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  file: any;
  base64Image: string | undefined;
  constructor() {
    this.id = 0;
    this.address = '';
    this.city = '';
    this.email = '';
    this.mobileNo = '';
    this.name = '';
    this.state = '';
    this.pincode = '';
  }

}
