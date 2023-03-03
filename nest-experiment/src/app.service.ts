import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public a: string;

  getHello(): string {
    return 'Hello World!';
  }

  setA(a: string) {
    return (this.a = a);
  }
}
