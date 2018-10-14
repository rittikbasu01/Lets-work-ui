import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any, date : string): any {
    let m = moment(date).format('MM/DD/YYYY h:mm a');
    
    return (m);
  }

}
