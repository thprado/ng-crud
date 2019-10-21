import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            
            {
                path: '',
                loadChildren: './pages/home/home.module#HomeModule'
            },
            {
                path: 'students',
                loadChildren: './pages/students/students.module#StudentsModule'
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
