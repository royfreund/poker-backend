import { Repository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

export const saveEntity = async <T>(repository: Repository<T>, entity: T): Promise<T> => {
  try {
    return (await repository.save(entity)) as T;
  } catch (e) {
    if (e.code === '23505') {
      throw new ConflictException('Duplicate Fields');
    } else {
      throw new InternalServerErrorException();
    }
  }
};
