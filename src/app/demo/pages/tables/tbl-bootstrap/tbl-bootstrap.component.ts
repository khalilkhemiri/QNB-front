import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from "@schedule-x/angular";
import { createCalendar, createViewWeek ,createViewMonthAgenda} from '@schedule-x/calendar';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tbl-bootstrap',
  standalone: true,
  imports: [SharedModule,CalendarComponent],
  templateUrl: './tbl-bootstrap.component.html',
  styleUrls: ['./tbl-bootstrap.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export default class TblBootstrapComponent {

  calendarApp: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/taches/stagiaire/67fe6e2ce170de1a3b628a4d')
      .subscribe((taches) => {
        const events = taches.map(tache => ({
          id: tache.id,
          title: tache.titre,
          start: tache.dateDebut.replace('""',''), 
          end: tache.dateFin.replace('""',''),
          backgroundColor: this.mapStatutToColor(tache.statut),
        }));

        this.calendarApp = createCalendar({
          events: events,
          views: [createViewWeek(), createViewMonthAgenda()],

        });
      });
  }
  mapStatutToColor(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE': return 'orange';
      case 'EN_COURS': return 'blue';
      case 'TERMINEE': return 'green';
      default: return 'gray';
    }}
}
