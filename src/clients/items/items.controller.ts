import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { classToClassFromExist, plainToClass } from 'class-transformer';
import { ItemEntity } from 'src/entity/item.entity';
import { ItemGetDto } from './dto/get.dto';

@Controller('clients/:clientId/items')
export class ItemsController {

  @Post()
  async create(@Param("clientId") clientId: number, @Body() item: ItemEntity): Promise<ItemGetDto | null> {
    item.client = clientId;
    return plainToClass(ItemGetDto, await item.save());
  }

  @Put("/:itemId")
  async update(@Param("clientId") clientId: number, @Param("itemId") itemId: number, @Body() item: ItemEntity): Promise<ItemGetDto | null> {
    const oldItem: ItemEntity = await ItemEntity.findOne({ client: clientId, id: itemId });
    const newItem = classToClassFromExist(item, oldItem);
    return plainToClass(ItemGetDto, await newItem.save());
  }
}
