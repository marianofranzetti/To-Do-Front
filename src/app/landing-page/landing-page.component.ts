import { Component, inject, OnInit } from '@angular/core';
import { AutorizadoComponent } from "../seguridad/autorizado/autorizado.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-landing-page',
    imports: [ MatToolbarModule, MatCardModule, MatButtonModule, MatCardModule, RouterLink],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css'
})
export class LandingPageComponent{

}
