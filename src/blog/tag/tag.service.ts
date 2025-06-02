import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  create() {
    return 'This action adds a new tag';
  }

  findAll() {
    return `This action returns all tag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update() {
    return `This action updates a id tag`;
  }

  remove(id: number) {
    return `This action removes a tag`;
  }
}
