import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(value: any[], args: string): any[] {
    if (!value) {
      return [];
    }
    if (!args || args.trim() === '') {
      return value;
    }
    args = args.toLowerCase();
    return value.filter((item: any) => {
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }
}
