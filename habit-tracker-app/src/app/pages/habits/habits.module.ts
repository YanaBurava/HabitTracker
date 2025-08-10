import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitsComponent } from './habits.component';
import { HabitFormComponent } from './habit-form/habit-form.component';
import { HabitsRoutingModule } from './habits-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { HabitCardComponent } from './habit-card/habit-card.component';
import { HabitGroupPipe } from '../../pipes/habit-group.pipe';
import { ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', component: HabitsComponent }
];

@NgModule({
  declarations: [
    HabitsComponent,
    HabitFormComponent,
    HabitCardComponent, 
    HabitGroupPipe,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    HabitsRoutingModule,
    MatCardModule,
    MatIconModule,     
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
   RouterModule.forChild(routes)
  ]
})
export class HabitsModule { }