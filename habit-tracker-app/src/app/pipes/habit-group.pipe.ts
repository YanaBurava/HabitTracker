import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'habitGroup',
  standalone: false
})
export class HabitGroupPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
