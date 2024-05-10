import { Result, failure } from '@util/result';
import { Customer } from '../../domain/customer/customer';
import { CustomerDomainMapper } from '@app/mapper/customer/customer.domain.mapper';
import { CreateCustomerService } from '@app/port/inbound/customer/create.customer.service';
import { CreateCustomerInboundRequest } from '@app/port/inbound/customer/dto/create.customer.inbound.request';
import { CustomerRepository } from '@app/port/outbound/customer/customer.repository';
import { CustomerOutboundResponse } from '@app/port/outbound/customer/dto/customer.outbound.response';
import { CustomerAlreadyExistsException } from '../exception/customer/customer.already.exists.exception';

export class CreateCustomerUseCase implements CreateCustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly customerDomainMapper: CustomerDomainMapper
  ) {}

  async create(
    createCustomerInboundRequest: CreateCustomerInboundRequest
  ): Promise<Result<Customer>> {
    const result = this.newCustomer(createCustomerInboundRequest);
    const customer = result.get();
    const cpf = customer.cpf;
    if (await this.customerRepository.exists(cpf)) {
      return failure(
        new CustomerAlreadyExistsException(
          `Cpf already exists: '${customer.cpf.value}'.`
        )
      );
    }
    return this.transformToCustomer(
      await this.customerRepository.persist(customer)
    );
  }

  newCustomer(
    createCustomerInboundRequest: CreateCustomerInboundRequest
  ): Result<Customer> {
    const now = new Date();
    const disabled = false;
    return this.customerDomainMapper.instanceInbound(
      createCustomerInboundRequest,
      disabled,
      now,
      now
    );
  }

  transformToCustomer(
    customerOutboundResponse: CustomerOutboundResponse
  ): Result<Customer> {
    return this.customerDomainMapper.instanceOutbound(customerOutboundResponse);
  }
}
