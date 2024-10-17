import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FondosService } from '../../services/fondos.service';
import { Fondo } from '../../models/fondo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fondo-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fondo-detail.component.html',
  styleUrl: './fondo-detail.component.css'
})
export class FondoDetailComponent implements OnInit {
  fondo: Fondo | undefined;

  constructor(
    private route: ActivatedRoute,
    private fondosService: FondosService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fondosService.getFondo(+id).subscribe(fondo => {
        this.fondo = fondo;
      });
    }
  }
}