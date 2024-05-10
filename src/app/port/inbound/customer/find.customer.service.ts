import { Customer } from '@app/core/domain/customer/customer';
import { Result } from '@util/result';

export interface FindCustomerService {
  find(cpfValue: string, disabled: boolean): Promise<Result<Customer>>;
}
