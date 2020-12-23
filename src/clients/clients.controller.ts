import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Like } from 'typeorm';
import { ClientEntity } from '../entity/client.entity';
import { ClientGetDto } from './dto/get.dto';
import { ClientIndexDto } from './dto/index.dto';

@Controller('clients')
export class ClientsController {
  @Get()
  async getList(): Promise<ClientIndexDto[]> {
    const clients: ClientEntity[] = await ClientEntity.find({
      where: {
        archived: false
      }
    });
  
    return plainToClass(ClientIndexDto, clients);
  }

  @Get("/search")
  async search(@Query("q") query: string): Promise<ClientIndexDto[]> {
    return plainToClass(ClientIndexDto, await ClientEntity.find({ where: { name: Like(`%${decodeURIComponent(query)}%`) } }));
  }

  @Get("/:id")
  async get(@Param("id") id: number): Promise<ClientGetDto | undefined> {
    return plainToClass(ClientGetDto, await ClientEntity.findOne(id));
  }

  @Post("/")
  async create(@Body() client: ClientEntity): Promise<ClientGetDto | null> {
    return plainToClass(ClientGetDto, await client.save());
  }

  @Put("/:id")
  async update(@Param("id") id: number, @Body() client: ClientEntity): Promise<ClientGetDto | null> {
    console.log(client);
    return plainToClass(ClientGetDto, await client.save());
  }

  @Delete("/:id")
  async delete(@Param("id") id: number): Promise<void> {
    await ClientEntity.delete(id);
  }
}
