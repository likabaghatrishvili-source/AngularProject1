import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 80): string {
    const s = String(value ?? '');
    return s.length > limit ? s.slice(0, limit).trimEnd() + '…' : s;
  }
}

