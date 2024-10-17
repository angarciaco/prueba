import { Component, OnInit } from '@angular/core';
import { FondosService } from '../../services/fondos.service';
import { Fondo } from '../../models/fondo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fondo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fondo-form.component.html',
  styleUrl: './fondo-form.component.css'
})
export class FondoFormComponent implements OnInit {
  fondo: Fondo = {
    id: 0,
    nombre: '',
    montoMinimo: 0,
    categoria: '',
    montoVinculacion: 0
  };

  constructor(
    private fondosService: FondosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fondosService.getFondo(+id).subscribe(fondo => {
        this.fondo = fondo;
      });
    }
  }

  saveFondo(): void {
    if (this.fondo.id) {
      this.fondosService.updateFondo(this.fondo).subscribe(() => {
        this.router.navigate(['/fondos']);
      });
    } else {
      this.fondosService.createFondo(this.fondo).subscribe(() => {
        this.router.navigate(['/fondos']);
      });
    }
  }
}