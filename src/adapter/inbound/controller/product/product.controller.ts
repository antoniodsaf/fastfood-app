import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe
} from '@nestjs/common';
import { CreateProductService } from '@app/port/inbound/product/create.product.service';
import { DeleteProductService } from '@app/port/inbound/product/delete.product.service';
import { FindProductService } from '@app/port/inbound/product/find.product.service';
import { UpdateProductService } from '@app/port/inbound/product/update.product.service';
import { ResponseWrapper } from '@util/response.wrapper';
import { CreateProductRequest } from './dto/create.product.request';
import { ProductResponse } from './dto/product.response';
import { UpdateProductRequest } from './dto/update.product.request';
import { ApiOkResponseWrapper } from '@util/api.ok.response.wrapper';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { ProductCategory } from '@app/core/domain/product/valueobject/product.category';

@Controller('/products')
export class ProductController {
  constructor(
    @Inject('CreateProductService')
    private readonly createProductService: CreateProductService,
    @Inject('UpdateProductService')
    private readonly updateProductService: UpdateProductService,
    @Inject('DeleteProductService')
    private readonly deleteProductService: DeleteProductService,
    @Inject('FindProductService')
    private readonly findProductService: FindProductService
  ) {}

  @Post()
  @ApiOkResponseWrapper(ProductResponse)
  async create(
    @Body() createProductRequest: CreateProductRequest
  ): Promise<ResponseWrapper<ProductResponse>> {
    const createdProduct = await this.createProductService.create(
      createProductRequest.toInbound()
    );
    return ResponseWrapper.new<ProductResponse>()
      .statusCode(HttpStatus.CREATED)
      .body(ProductResponse.from(createdProduct.get()));
  }

  @Put('/:id')
  @ApiOkResponseWrapper(ProductResponse)
  async update(
    @Param('id') id: string,
    @Body() updateProductRequest: UpdateProductRequest
  ): Promise<ResponseWrapper<ProductResponse>> {
    const updatedProduct = await this.updateProductService.update(
      id,
      updateProductRequest.toInbound()
    );
    return ResponseWrapper.new<ProductResponse>()
      .statusCode(HttpStatus.OK)
      .body(ProductResponse.from(updatedProduct.get()));
  }

  @Delete('/:id')
  @ApiOkResponseWrapper(() => {})
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteProductService.delete(id);
    ResponseWrapper.new().statusCode(HttpStatus.NO_CONTENT);
  }

  @Get('/category/:value')
  @ApiOkResponseWrapper(ProductResponse, true)
  @ApiQuery({
    name: 'disabled',
    type: Boolean,
    description: "'disabled query param' é opcional, valor padrao é 'false'.",
    required: false
  })
  @ApiParam({
    name: 'value',
    enum: ProductCategory
  })
  async findByCategory(
    @Param('value') category: string,
    @Query('disabled') disabled?: boolean
  ): Promise<ResponseWrapper<ProductResponse[]>> {
    const products = await this.findProductService.findAll(category, disabled);
    return ResponseWrapper.new<ProductResponse[]>()
      .statusCode(HttpStatus.OK)
      .body(products.get().map((it) => ProductResponse.from(it)));
  }
}
