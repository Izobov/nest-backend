import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uid from 'uuid';
@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
        const name = uid.v4() + ".jpg"
        const filePath = path.resolve(__dirname, "..", "static")
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, {recursive: true})
        }
        fs.writeFileSync(path.join(filePath, name), file.buffer);
        return name
    } catch (e) {
        console.log(e)
      throw new HttpException(
        'Cannot store file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
