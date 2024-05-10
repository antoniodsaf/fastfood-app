import { Cpf } from '@app/core/domain/customer/valueobject/cpf';
import { Order } from '@app/core/domain/order/order';
import { OrderItem } from '@app/core/domain/order/order.item';
import { OrderId } from '@app/core/domain/order/valueobject/order.id';
import { OrderItemId } from '@app/core/domain/order/valueobject/order.item.id';
import { OrderItemQuantity } from '@app/core/domain/order/valueobject/order.item.quantity';
import { OrderNumber } from '@app/core/domain/order/valueobject/order.number';
import { OrderStatus } from '@app/core/domain/order/valueobject/order.status';
import { OrderDomainMapper } from '@app/mapper/order/order.domain.mapper';
import { FindCustomerService } from '@app/port/inbound/customer/find.customer.service';
import { CreateOrderService } from '@app/port/inbound/order/create.order.service';
import { CreateOrderInboundRequest } from '@app/port/inbound/order/dto/create.order.inbound.request';
import { CreateOrderItemInboundRequest } from '@app/port/inbound/order/dto/create.order.item.inbound.request';
import { CreateOrderPaymentService } from '@app/port/inbound/orderpayment/create.order.payment.service';
import { FindProductService } from '@app/port/inbound/product/find.product.service';
import { OrderOutboundResponse } from '@app/port/outbound/order/dto/order.outbound.response';
import { OrderRepository } from '@app/port/outbound/order/order.repository';
import { Result, failure } from '@util/result';
import { InvalidOrderStateException } from '../exception/order/invalid.order.state.exception';

export class CreateOrderUseCase implements CreateOrderService {
  constructor(
    readonly orderRepository: OrderRepository,
    readonly orderDomainMapper: OrderDomainMapper,
    readonly findCustomerService: FindCustomerService,
    readonly findProductService: FindProductService,
    readonly createOrderPaymentService: CreateOrderPaymentService
  ) {}

  async create(
    createOrderInboundRequest: CreateOrderInboundRequest
  ): Promise<Result<Order>> {
    const orderCreated = await this.saveOrder(
      (await this.createOrder(createOrderInboundRequest)).get()
    );
    this.createOrderPaymentService.execute(orderCreated.get().id);
    return orderCreated;
  }

  private async createOrder(
    createOrderInboundRequest: CreateOrderInboundRequest
  ): Promise<Result<Order>> {
    const cpf = (await this.findCpf(createOrderInboundRequest.cpf)).get();
    const orderItems = (
      await this.createOrderItems(createOrderInboundRequest.items)
    ).get();

    const orderNumberValue = await this.findOrderNumber();
    const now = new Date();
    return this.orderDomainMapper.instance(
      OrderId.generate(),
      orderNumberValue.get(),
      orderItems,
      OrderStatus.RECEIVED,
      now,
      now,
      cpf
    );
  }

  private async findCpf(cpf: string): Promise<Result<Cpf | null>> {
    const customer = await this.findCustomerService.find(cpf, false);
    return Result.success(customer.get().cpf);
  }

  private async createOrderItems(
    createOrderItemsInboundRequest: CreateOrderItemInboundRequest[]
  ): Promise<Result<OrderItem[]>> {
    if (
      !createOrderItemsInboundRequest ||
      createOrderItemsInboundRequest.length == 0
    ) {
      return failure(
        new InvalidOrderStateException(
          'need to inform at least one order item.'
        )
      );
    }
    if (
      createOrderItemsInboundRequest.some(
        (item) => !item || !item.quantity || !item.productId
      )
    ) {
      return failure(
        new InvalidOrderStateException('need to inform valid order items.')
      );
    }

    const orderItems = await Promise.all(
      createOrderItemsInboundRequest.map(
        async (it: CreateOrderItemInboundRequest) => {
          return (await this.createOrderItem(it)).get();
        }
      )
    );

    return Result.success(orderItems);
  }

  private async createOrderItem(
    item: CreateOrderItemInboundRequest
  ): Promise<Result<OrderItem>> {
    const id = OrderItemId.generate();
    const product = await this.findProductService.find(item.productId, false);
    const quantity = OrderItemQuantity.new(item.quantity);

    return this.orderDomainMapper.instanceItem(
      id,
      product.get(),
      quantity.get()
    );
  }

  private async findOrderNumber(): Promise<Result<OrderNumber>> {
    const orderNumberValue = await this.orderRepository.findNumber();
    return OrderNumber.new(orderNumberValue);
  }

  private async saveOrder(order: Order): Promise<Result<Order>> {
    return this.toOrder(await this.orderRepository.save(order));
  }

  private toOrder(orderOutboundResponse: OrderOutboundResponse): Result<Order> {
    return this.orderDomainMapper.instanceOutbound(orderOutboundResponse);
  }
}
