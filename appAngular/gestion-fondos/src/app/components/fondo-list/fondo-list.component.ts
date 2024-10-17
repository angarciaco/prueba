import { Component, OnInit } from '@angular/core';
import { FondosService } from '../../services/fondos.service';
import { Fondo } from '../../models/fondo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fondo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fondo-list.component.html',
  styleUrl: './fondo-list.component.css'
})
export class FondoListComponent implements OnInit {
  fondos: Fondo[] = [];

  constructor(private fondosService: FondosService) { }

  ngOnInit(): void {
    this.loadFondos();
  }

  loadFondos(): void {
    this.fondosService.getFondos().subscribe((data: Fondo[]) => {
      this.fondos = data;
    });
  }

  deleteFondo(id: number): void {
    this.fondosService.deleteFondo(id).subscribe(() => {
      this.loadFondos();
    });
  }
}