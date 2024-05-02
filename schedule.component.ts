import { Component,ElementRef, ViewChild,OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {
  @ViewChild('scheduleModel') model: ElementRef | undefined;
  employeeArr: any[] = [];
  employee: any = {
    week: '',
    fromtime: '',
    totime: ''
  };
  constructor() { }
  ngOnInit(): void {
  }
  onAddMteeing() {
    const model = document.getElementById("scheduleModel");
    if (model != null) {
      model.style.display = 'block'
    }
  }
  onCloseschedule() {

    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }
  onDelete() {

  }
  onEdit() {

  }
  saveMeeting() {
    console.log(this.employee)
    this.employeeArr.push(this.employee);
    this.onCloseschedule();
    localStorage.setItem('Schedule', JSON.stringify(this.employeeArr));
  }
}
