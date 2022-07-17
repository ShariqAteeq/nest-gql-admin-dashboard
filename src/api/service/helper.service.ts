import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  public generateId(length = 6): string {
    const timestamp = +new Date();

    const _getRandomInt = (min, max): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const ts = timestamp.toString();
    const parts = ts.split('').reverse();
    let id = '';

    for (let i = 0; i < length; ++i) {
      const index = _getRandomInt(0, parts.length - 1);
      id += parts[index];
    }

    return id;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public changeObjKeys(obj: unknown, replaceStr): any {
    const data = Object.keys(obj).map((key) => {
      return { [key.replace(replaceStr, '')]: obj[key] };
    });

    return data;
  }
}
