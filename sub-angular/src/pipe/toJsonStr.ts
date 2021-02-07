import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name:"toJsonStr"
})

export class toJsonStrPipe implements PipeTransform{
  transform(value:any, args?:any):any{
    return JSON.stringify(value);
  }
}
