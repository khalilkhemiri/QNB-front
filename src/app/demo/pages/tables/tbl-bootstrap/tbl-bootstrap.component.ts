import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from "@schedule-x/angular";
import { createCalendar, createViewWeek } from "@schedule-x/calendar";
@Component({
  selector: 'app-tbl-bootstrap',
  standalone: true,
  imports: [SharedModule,CalendarComponent],
  templateUrl: './tbl-bootstrap.component.html',
  styleUrls: ['./tbl-bootstrap.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export default class TblBootstrapComponent {
  title = 'angular-example';
  calendarApp = createCalendar({
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2025-05-05 03:00',
        end: '2025-05-05 05:00',
      },
    ],
    views: [createViewWeek()],
  })

}
