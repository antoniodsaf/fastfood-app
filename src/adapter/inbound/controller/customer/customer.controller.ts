import { CreateCustomerService } from '@app/port/inbound/customer/create.customer.service';
import { FindCustomerService } from '@app/port/inbound/customer/find.customer.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { ApiOkResponseWrapper } from '@util/api.ok.response.wrapper';
import { ResponseWrapper } from '@util/response.wrapper';
import { CreateCustomerRequest } from './dto/create.customer.request';
import { CustomerResponse } from './dto/customer.response';

@Controller('/customers')
export class CustomerController {
  constructor(
    @Inject('CreateCustomerService')
    private readonly createCustomerService: CreateCustomerService,
    @Inject('FindCustomerService')
    private readonly findCustomerService: FindCustomerService
  ) {}

  @Post()
  @ApiOkResponseWrapper(CustomerResponse)
  async create(
    @Body() createCustomerRequest: CreateCustomerRequest
  ): Promise<ResponseWrapper<CustomerResponse>> {
    const result = await this.createCustomerService.create(
      createCustomerRequest.toInbound()
    );
    return ResponseWrapper.new<CustomerResponse>()
      .statusCode(HttpStatus.CREATED)
      .body(CustomerResponse.from(result.get()));
  }

  @Get(':cpf')
  @ApiQuery({
    name: 'disabled',
    type: Boolean,
    description: "'disabled query param' é opcional, valor padrao é 'false'.",
    required: false
  })
  @ApiOkResponseWrapper(CustomerResponse)
  async find(
    @Param('cpf') cpf: string,
    @Query('disabled') disabled: boolean = false
  ): Promise<ResponseWrapper<CustomerResponse>> {
    const customer = await this.findCustomerService.find(cpf, disabled);
    return ResponseWrapper.new<CustomerResponse>()
      .statusCode(HttpStatus.OK)
      .body(CustomerResponse.from(customer.get()));
  }
}
