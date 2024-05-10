import { Customer } from '@app/core/domain/customer/customer';
import { Cpf } from '@app/core/domain/customer/valueobject/cpf';
import { CustomerOutboundResponse } from './dto/customer.outbound.response';

export interface CustomerRepository {
  persist(customer: Customer): Promise<CustomerOutboundResponse>;
  find(
    cpf: Cpf,
    disabled: boolean
  ): Promise<CustomerOutboundResponse | undefined>;
  exists(cpf: Cpf): Promise<boolean>;
}
