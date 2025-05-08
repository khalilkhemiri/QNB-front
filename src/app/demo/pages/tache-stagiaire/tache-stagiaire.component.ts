import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TacheService } from '../../service/tache/tache.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tache-stagiaire',
  standalone: true,
  imports: [ CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    ],
  templateUrl: './tache-stagiaire.component.html',
  styleUrl: './tache-stagiaire.component.scss',
  providers: [DialogService, MessageService],
  

})
export class TacheStagiaireComponent implements OnInit {
  taches: any[] = [];
  selectedTache: any;
  displayDetail = false;
  renduText: string = '';
  renduFile: File | null = null;
  stagiaireId = '67fe6e2ce170de1a3b628a4d'; 

  constructor(private tacheService: TacheService, private messageService: MessageService,private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTaches();
  }

  loadTaches() {
    this.http.get<any[]>(`http://localhost:8080/api/taches/stagiaire/${this.stagiaireId}`)
    .subscribe({
      next: (data) => this.taches = data,
      error: (err) => console.error('Erreur de chargement des tâches', err)
    });
  }

  showDetail(tache: any) {
    this.selectedTache = tache;
    this.displayDetail = true;
  }

  onFileSelected(event: any) {
    this.renduFile = event.target.files[0];
  }

  submitRendu() {
    if (!this.selectedTache) return;

    const formData = new FormData();
    formData.append('renduText', this.renduText);
    if (this.renduFile) {
      formData.append('file', this.renduFile);
    }

    this.tacheService.envoyerRendu(this.selectedTache.id, formData).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Rendu envoyé' });
        this.displayDetail = false;
        this.renduText = '';
        this.renduFile = null;
      },
      err => console.error('Erreur lors du rendu', err)
    );
  }
}