import { Result } from '@util/result';
import { CreateCustomerInboundRequest } from './dto/create.customer.inbound.request';
import { Customer } from '@app/core/domain/customer/customer';

export interface CreateCustomerService {
  create(
    createCustomerInboundRequest: CreateCustomerInboundRequest
  ): Promise<Result<Customer>>;
}
