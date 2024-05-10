import { Result } from '@util/result';
import { InvalidProductCategoryError } from '../../exceptions/product/invalid.product.category.error';

export enum ProductCategory {
  SNACK = 'SNACK',
  DRINK = 'DRINK',
  DESSERT = 'DESSERT',
  SIDE_DISH = 'SIDE_DISH'
}

export namespace ProductCategory {
  export function instance(value: string): Result<ProductCategory> {
    if (!value) {
      return Result.failure(
        new InvalidProductCategoryError(`Product category must be informed.`)
      );
    }
    const category = Object.values(ProductCategory).find(
      (category) => category === value
    );
    if (!category) {
      return Result.failure(
        new InvalidProductCategoryError(
          `${value} is not a valid ProductCategory.`
        )
      );
    }
    return Result.success(category as ProductCategory);
  }
}
