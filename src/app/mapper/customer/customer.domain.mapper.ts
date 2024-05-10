import { Customer } from '@app/core/domain/customer/customer';
import { CreateCustomerInboundRequest } from '@app/port/inbound/customer/dto/create.customer.inbound.request';
import { CustomerOutboundResponse } from '@app/port/outbound/customer/dto/customer.outbound.response';
import { Result } from '@util/result';

export interface CustomerDomainMapper {
  instanceInbound(
    createCustomerInboundRequest: CreateCustomerInboundRequest,
    disabled: boolean,
    createdAt: Date,
    updatedAt: Date
  ): Result<Customer>;

  instanceOutbound(
    customerOutboundResponse: CustomerOutboundResponse
  ): Result<Customer>;
}
