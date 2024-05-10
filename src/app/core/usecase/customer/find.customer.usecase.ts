import { Cpf } from '@app/core/domain/customer/valueobject/cpf';
import { CustomerDomainMapper } from '@app/mapper/customer/customer.domain.mapper';
import { FindCustomerService } from '@app/port/inbound/customer/find.customer.service';
import { CustomerRepository } from '@app/port/outbound/customer/customer.repository';
import { CustomerOutboundResponse } from '@app/port/outbound/customer/dto/customer.outbound.response';
import { Result, failure } from '@util/result';
import { Customer } from '../../domain/customer/customer';
import { CustomerNotFoundException } from '../exception/customer/customer.not.found.exception';

export class FindCustomerUseCase implements FindCustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly customerDomainMapper: CustomerDomainMapper
  ) {}

  async find(cpfValue: string, disabled: boolean): Promise<Result<Customer>> {
    const cpf = Cpf.new(cpfValue).get();
    const outboundResponse = await this.customerRepository.find(cpf, disabled);
    if (!outboundResponse) {
      return failure(
        new CustomerNotFoundException(
          `Id='${JSON.stringify(cpf)}' not found w/ disabled='${disabled}'.`
        )
      );
    }
    return this.toCustomer(outboundResponse);
  }

  toCustomer(
    customerOutboundResponse: CustomerOutboundResponse
  ): Result<Customer> {
    return this.customerDomainMapper.instanceOutbound(customerOutboundResponse);
  }
}
