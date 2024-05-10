import { options } from '@adapter/outbound/database/datasource';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerPortConfigModule } from '@infra/customer.port.config';
import { ProductPortConfigModule } from '@infra/product.port.config';
import { OrderPortConfigModule } from '@infra/order.port.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(options),
    CustomerPortConfigModule,
    ProductPortConfigModule,
    OrderPortConfigModule
  ]
})
export class AppModule {}
