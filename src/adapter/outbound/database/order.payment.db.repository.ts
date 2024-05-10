import { OrderId } from '@app/core/domain/order/valueobject/order.id';
import { OrderPayment } from '@app/core/domain/orderpayment/order.payment';
import { OrderPaymentOutboundResponse } from '@app/port/outbound/orderpayment/dto/order.payment.outbound.response';
import { OrderPaymentRepository } from '@app/port/outbound/orderpayment/order.payment.repository';
import { OrderPaymentEntity } from '../typeorm/entity/order.payment.entity';
import { OrderPaymentTypeOrmRepository } from '../typeorm/order.payment.typeorm.repository';

export class OrderPaymentDatabaseRepository implements OrderPaymentRepository {
  constructor(
    readonly orderPaymentTypeOrmRepository: OrderPaymentTypeOrmRepository
  ) {}

  async save(
    orderPayment: OrderPayment
  ): Promise<OrderPaymentOutboundResponse> {
    const savedEntity = await this.orderPaymentTypeOrmRepository.save(
      OrderPaymentEntity.from(orderPayment)
    );
    return savedEntity.toOutbound();
  }

  async findByOrderId(
    orderId: OrderId
  ): Promise<OrderPaymentOutboundResponse | null> {
    const foundEntity = await this.orderPaymentTypeOrmRepository.findOne({
      where: { orderId: orderId.value }
    });
    return foundEntity.toOutbound() || null;
  }
}
