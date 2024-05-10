import { Result } from '@util/result';

export interface DeleteProductService {
  delete(id: string): Promise<Result<void>>;
}
