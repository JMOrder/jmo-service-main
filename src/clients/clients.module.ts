import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ItemsModule } from './items/items.module';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [ItemsModule]
})
export class ClientsModule {}
