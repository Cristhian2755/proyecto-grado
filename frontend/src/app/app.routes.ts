import { Routes } from '@angular/router';

import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { ForgotPasswordComponent } from './forgot-password/forgot-password';
import { ResetPasswordComponent } from './reset-password/reset-password';
import { HomeAdministradorComponent } from './homes/administrador/home-administrador';
import { HomeEstudianteComponent } from './homes/estudiante/home-estudiante';
import { HomeDocenteComponent } from './homes/docente/home-docente';
import { HomeCoordinadorComponent } from './homes/coordinador/home';
import { ProjectComponent } from './project/project';
import { StudentRegisterComponent } from './register/student-register/student-register';
import { DocenteRegisterComponent } from './register/docente-register/docente-register';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { HomeComponent } from './home/home';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'login'
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
		canActivate: [AuthGuard]
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
