import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { OrderEntity } from './entity/order.entity';

@Injectable()
export class OrderTypeOrmRepository extends Repository<OrderEntity> {
  constructor(private dataSource: DataSource) {
    super(OrderEntity, dataSource.createEntityManager());
  }

  async findNumber(): Promise<number> {
    const [{ id }] = await this.dataSource.query(
      "SELECT nextval('numero_pedido') as id"
    );
    return parseInt(id);
  }

  async findById(id: string): Promise<OrderEntity> {
    return await super.findOne({ where: { id } });
  }

  async findOrdersOrderedByStatusAndCreatedAt(): Promise<OrderEntity[]> {
    return await this.createQueryBuilder('p')
      .where("p.status != 'FINISHED'")
      .addOrderBy(
        'CASE ' +
          "WHEN p.status = 'READY' THEN 1 " +
          "WHEN p.status = 'PREPARING' THEN 2 " +
          "WHEN p.status = 'RECEIVED' THEN 3 " +
          'ELSE 4 ' +
          'END'
      )
      .addOrderBy('p.createdAt')
      .getMany();
  }
}
