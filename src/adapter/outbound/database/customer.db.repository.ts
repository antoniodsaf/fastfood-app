import { Customer } from 'src/app/core/domain/customer/customer';
import { CustomerRepository } from 'src/app/port/outbound/customer/customer.repository';
import { CustomerOutboundResponse } from 'src/app/port/outbound/customer/dto/customer.outbound.response';
import { CustomerTypeOrmRepository } from '../typeorm/customer.typeorm.repository';
import { CustomerEntity } from '../typeorm/entity/customer.entity';
import { Cpf } from '@app/core/domain/customer/valueobject/cpf';

export class CustomerDatabaseRepository implements CustomerRepository {
  constructor(
    private readonly customerTypeOrmRepository: CustomerTypeOrmRepository
  ) {}

  async persist(customer: Customer): Promise<CustomerOutboundResponse> {
    return (
      await this.customerTypeOrmRepository.save(CustomerEntity.from(customer))
    ).toOutbound();
  }

  async find(
    cpf: Cpf,
    disabled: boolean
  ): Promise<CustomerOutboundResponse | undefined> {
    return (
      await this.customerTypeOrmRepository.findOne({
        where: { cpf: cpf.value, disabled }
      })
    )?.toOutbound();
  }

  async exists(cpf: Cpf): Promise<boolean> {
    return await this.customerTypeOrmRepository.existsBy({ cpf: cpf.value });
  }
}
