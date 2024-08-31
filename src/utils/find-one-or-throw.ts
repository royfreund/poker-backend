import { Repository } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { NotFoundException } from '@nestjs/common';

export const findOneOrThrow = async <T>(
  repository: Repository<T>,
  where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  errorMessage: string = 'Entity not found',
): Promise<T> => {
  const entity: T = await repository.findOneBy(where);

  if (!entity) {
    throw new NotFoundException(errorMessage);
  }

  return entity;
};
