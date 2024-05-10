import { Injectable } from '@nestjs/common';
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { CustomerEntity } from './entity/customer.entity';

@Injectable()
export class CustomerTypeOrmRepository extends Repository<CustomerEntity> {
  constructor(private dataSource: DataSource) {
    super(CustomerEntity, dataSource.createEntityManager());
  }
}
