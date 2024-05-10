import { CreateOrderService } from '@app/port/inbound/order/create.order.service';
import { FindOrderService } from '@app/port/inbound/order/find.order.service';
import { UpdateOrderStatusService } from '@app/port/inbound/order/update.order.status.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { ResponseWrapper } from '@util/response.wrapper';
import { OrderResponse } from './dto/order.response';
import { CreateOrderRequest } from './dto/create.order.request';
import { UpdateOrderStatusRequest } from './dto/update.order.status.request';
import { ApiOkResponseWrapper } from '@util/api.ok.response.wrapper';
import { ApiBody } from '@nestjs/swagger';

@Controller('/orders')
export class OrderController {
  constructor(
    @Inject('CreateOrderService')
    private readonly createOrderService: CreateOrderService,
    @Inject('FindOrderService')
    private readonly findOrderService: FindOrderService,
    @Inject('UpdateOrderStatusService')
    private readonly updateOrderStatusService: UpdateOrderStatusService
  ) {}

  @Get()
  @ApiOkResponseWrapper(
    OrderResponse,
    true,
    'Recurso que retorna todos pedidos ordernados por status e data de criacao.'
  )
  async findOrdersWithDescriptions(): Promise<
    ResponseWrapper<OrderResponse[]>
  > {
    const orders =
      await this.findOrderService.findOrdersOrderedByStatusAndCreatedAt();
    const ordersDto = orders.get().map((order) => OrderResponse.from(order));

    return ResponseWrapper.new<OrderResponse[]>()
      .statusCode(HttpStatus.OK)
      .body(ordersDto);
  }

  @Post()
  @ApiOkResponseWrapper(OrderResponse)
  async create(
    @Body() createOrderRequest: CreateOrderRequest
  ): Promise<ResponseWrapper<OrderResponse>> {
    const order = await this.createOrderService.create(
      createOrderRequest.toInbound()
    );
    const orderDto = OrderResponse.from(order.get());

    return ResponseWrapper.new<OrderResponse>()
      .statusCode(HttpStatus.OK)
      .body(orderDto);
  }

  @Put('/:id/status')
  @ApiOkResponseWrapper(OrderResponse)
  async updateStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusRequest: UpdateOrderStatusRequest
  ): Promise<ResponseWrapper<OrderResponse>> {
    const order = await this.updateOrderStatusService.update(
      id,
      updateOrderStatusRequest.toInbound()
    );
    const orderDto = OrderResponse.from(order.get());

    return ResponseWrapper.new<OrderResponse>()
      .statusCode(HttpStatus.OK)
      .body(orderDto);
  }
}
