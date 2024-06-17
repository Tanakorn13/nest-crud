import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export default class HashData {
  async hash(data: string) {
    return await bcrypt.hash(data, 10);
  }
  async compareHash(password: string, dbPassword: string) {
    return await bcrypt.compare(password, dbPassword);
  }
}

