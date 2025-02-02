import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { esAdminGuard } from './compartidos/guards/es-admin.guard';
import { LoginComponent } from './seguridad/login/login.component';
import { RegistroComponent } from './seguridad/registro/registro.component';
import { IndiceUsuariosComponent } from './seguridad/indice-usuarios/indice-usuarios.component';
import { IndiceTareasComponent } from './tareas/indice-tareas/indice-tareas.component';
import { CrearTareasComponent } from './tareas/crear-tareas/crear-tareas.component';
import { EditarTareaComponent } from './tareas/editar-tarea/editar-tarea.component';
import { FiltroTareasComponent } from './tareas/filtro-tareas/filtro-tareas.component';
import { DetalleTareaComponent } from './tareas/detalle-tarea/detalle-tarea.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'tareas', component: IndiceTareasComponent, canActivate: [esAdminGuard]},
    {path: 'tareas/crear', component: CrearTareasComponent, canActivate: [esAdminGuard]},
    {path: 'tareas/editar/:id', component: EditarTareaComponent, canActivate: [esAdminGuard]},
    {path: 'tareas/filtrar', component: FiltroTareasComponent},
    {path: 'tareas/:id', component: DetalleTareaComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registrar', component: RegistroComponent},
    {path: 'usuarios', component: IndiceUsuariosComponent, canActivate: [esAdminGuard]},
    {path: '**', redirectTo: ''},
];
