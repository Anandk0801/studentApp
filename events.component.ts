import { Component, ElementRef, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { ToastrService } from 'ngx-toastr';
import dayGridPlugin from '@fullcalendar/daygrid'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  @ViewChild('eventModel') model: ElementRef | undefined;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',

  };
  newEventTitle: string = '';
  newEventDate: string = '';
  events: EventInput[] = JSON.parse(localStorage.getItem('Events') || '[]');
  constructor(private toastr: ToastrService) {
    this.calendarOptions.events = this.events;
  }
  addEvent(): void {
    if (this.newEventTitle.trim() === '' || this.newEventDate.trim() === '') {
      this.toastr.error('Please enter event title and date.');
      return;
    }
    const selectedDate: Date = new Date(this.newEventDate);
    const currentDate: Date = new Date();
    if (selectedDate < currentDate) {
      this.toastr.warning('Please select a Valid date.');
      return;
    }
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newEvent: EventInput = {
      title: this.newEventTitle,
      start: this.newEventDate,
      color: randomColor,
    };
    this.events.push(newEvent);
    localStorage.setItem('Events', JSON.stringify(this.events))
    this.toastr.success('Events Add Successfully')
    this.events = JSON.parse(localStorage.getItem('Events') || '[]');
    this.calendarOptions.events = this.events;
    this.closeEvents()
  }
  addEvents() {
    const model = document.getElementById("eventModel");
    if (model != null) {
      model.style.display = 'block'
    }
  }
  closeEvents() {
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

}
