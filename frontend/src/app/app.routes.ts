import { Routes } from '@angular/router';

import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { ForgotPasswordComponent } from './forgot-password/forgot-password';
import { ResetPasswordComponent } from './reset-password/reset-password';
import { HomeAdministradorComponent } from './home/homes/administrador/home-administrador';
import { HomeEstudianteComponent } from './home/homes/estudiante/home-estudiante';
import { HomeDocenteComponent } from './home/homes/docente/home-docente';
import { HomeCoordinadorComponent } from './home/homes/coordinador/home';
import { ProjectComponent } from './-esstu/project';
import { ProjectEstudianteComponent } from './project-estudiante/project-estudiante';
import { StudentRegisterComponent } from './register/student-register/student-register';
import { DocenteRegisterComponent } from './register/docente-register/docente-register';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { HomeComponent } from './home/home';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: HomeComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
	{
		path: 'forgot-password',
		component: ForgotPasswordComponent
	},
	{
		path: 'reset-password',
		component: ResetPasswordComponent
	},
	{
		path: 'home',
		component: HomeComponent,
	},
	{
		path: 'home-administrador',
		component: HomeAdministradorComponent,
		canActivate: [AuthGuard, RoleGuard],
		data: { roles: ['administrador', 'coordinador'] }
	},
	{
		path: 'home-estudiante',
		component: HomeEstudianteComponent,
		canActivate: [AuthGuard, RoleGuard],
		data: { roles: ['estudiante'] }
	},
	{
		path: 'home-docente',
		component: HomeDocenteComponent,
		canActivate: [AuthGuard, RoleGuard],
		data: { roles: ['docente', 'asesor', 'jurado'] }
	},
	{
		path: 'home-coordinador',
		component: HomeCoordinadorComponent,
		canActivate: [AuthGuard, RoleGuard],
		data: { roles: ['coordinador'] }
	},
	{
		path: 'project',
		component: ProjectComponent,
		canActivate: [AuthGuard, RoleGuard],
		data: { roles: ['coordinador', 'administrador'] }
	},
	{
		path: 'project-estudiante',
		component: ProjectEstudianteComponent,
		canActivate: [AuthGuard, RoleGuard],
		data: { roles: ['estudiante'] }
	},
	{
		path: 'register-student',
		component: StudentRegisterComponent,
		canActivate: [AuthGuard, RoleGuard],
		data: { roles: ['coordinador', 'administrador'] }
	},
	{
		path: 'register-docente',
		component: DocenteRegisterComponent,
		canActivate: [AuthGuard, RoleGuard],
		data: { roles: ['coordinador', 'administrador'] }
	},
	{
		path: '**',
		redirectTo: 'login'
	}
];
