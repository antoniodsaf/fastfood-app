import { FindOrderPaymentStatusService } from '@app/port/inbound/orderpayment/find.order.payment.status.service';
import { ProcessOrderPaymentService } from '@app/port/inbound/orderpayment/process.order.payment.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post
} from '@nestjs/common';
import { ResponseWrapper } from '@util/response.wrapper';
import { ProcessOrderPaymentRequest } from './dto/process.order.payment.request';
import { FindOrderPaymentStatusInboundRequest } from '@app/port/inbound/orderpayment/dto/find.order.payment.status.inbound.request';
import { OrderPaymentResponse } from './dto/order.payment.response';
import { ApiOkResponseWrapper } from '@util/api.ok.response.wrapper';

@Controller('/orders-payment')
export class OrderPaymentController {
  constructor(
    @Inject('ProcessOrderPaymentService')
    private readonly processOrderPaymentService: ProcessOrderPaymentService,
    @Inject('FindOrderPaymentStatusService')
    private readonly consultOrderPaymentStatusService: FindOrderPaymentStatusService
  ) {}

  @Get('/order/:orderId')
  @ApiOkResponseWrapper(
    OrderPaymentResponse,
    false,
    'Recurso que retorna o pagamento associado ao pedido.'
  )
  async consult(
    @Param('orderId') orderId: string
  ): Promise<ResponseWrapper<OrderPaymentResponse>> {
    const response = await this.consultOrderPaymentStatusService.execute(
      new FindOrderPaymentStatusInboundRequest(orderId)
    );
    return ResponseWrapper.new<OrderPaymentResponse>()
      .statusCode(HttpStatus.OK)
      .body(OrderPaymentResponse.from(response.get()));
  }

  @Post('/webhook/process')
  @ApiOkResponseWrapper(OrderPaymentResponse)
  async process(
    @Body() processOrderPaymentRequest: ProcessOrderPaymentRequest
  ): Promise<ResponseWrapper<OrderPaymentResponse>> {
    const response = await this.processOrderPaymentService.execute(
      processOrderPaymentRequest.toInbound()
    );
    return ResponseWrapper.new<OrderPaymentResponse>()
      .statusCode(HttpStatus.OK)
      .body(OrderPaymentResponse.from(response.get()));
  }
}
