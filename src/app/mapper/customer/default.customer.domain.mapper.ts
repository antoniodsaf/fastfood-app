import { Customer } from "@app/core/domain/customer/customer";
import { Cpf } from "@app/core/domain/customer/valueobject/cpf";
import { Email } from "@app/core/domain/customer/valueobject/email";
import { PersonName } from "@app/core/domain/customer/valueobject/person.name";
import { CreateCustomerInboundRequest } from "@app/port/inbound/customer/dto/create.customer.inbound.request";
import { CustomerOutboundResponse } from "@app/port/outbound/customer/dto/customer.outbound.response";
import { Result } from "@util/result";
import { CustomerDomainMapper } from "./customer.domain.mapper";

export class DefaultCustomerDomainMapper implements CustomerDomainMapper {
  instanceInbound(
    request: CreateCustomerInboundRequest,
    disabled: boolean,
    createdAt: Date,
    updatedAt: Date
  ): Result<Customer> {
    return Customer.new(
      Cpf.new(request.cpf).get(),
      PersonName.new(request.name).get(),
      Email.new(request.email).get(),
      createdAt,
      updatedAt,
      disabled
    );
  }

  instanceOutbound(
    outboundResponse: CustomerOutboundResponse
  ): Result<Customer> {
    return Customer.new(
      Cpf.new(outboundResponse.cpf).get(),
      PersonName.new(outboundResponse.name).get(),
      Email.new(outboundResponse.email).get(),
      outboundResponse.createdAt,
      outboundResponse.updatedAt,
      outboundResponse.disabled
    );
  }
}
