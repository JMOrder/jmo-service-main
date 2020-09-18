import { Controller, Post, PathParams, BodyParams, Get, MergeParams, Put, Delete, QueryParams } from "@tsed/common";
import { Authenticate } from "@tsed/passport";
import { ItemGetDto, ItemIndexDto } from "@dto/ItemDto";
import { Item } from "@entity/Item";
import { plainToClass } from "class-transformer";
import { Returns, ReturnsArray } from "@tsed/swagger";
import { NO_CONTENT, NOT_FOUND } from "http-status-codes";
import { Like } from "typeorm";
import { NotFound } from "@tsed/exceptions";

@Controller("/clients/:clientId/items")
@Authenticate("jwt-user")
@MergeParams()
export class ItemsController {
  @Get("/")
  @ReturnsArray(ItemIndexDto)
  async get(@PathParams("clientId") clientId: number): Promise<ItemIndexDto[]> {
    return plainToClass(ItemIndexDto, await Item.find({ where: { client: clientId }, order: { createdAt: "ASC" }, withDeleted: false }));
  }

  @Get("/search")
  @ReturnsArray(ItemIndexDto)
  async search(@PathParams("clientId") clientId: number, @QueryParams("q") query: string): Promise<ItemIndexDto[]> {
    return plainToClass(ItemIndexDto, await Item.find({ where: { client: clientId, name: Like(`%${decodeURIComponent(query)}%`) } }));
  }

  @Get("/:itemId")
  @Returns(ItemGetDto)
  async getById(@PathParams("clientId") clientId: number, @PathParams("itemId") itemId: number): Promise<ItemGetDto> {
    return plainToClass(ItemGetDto, await Item.findOne({ where: { id: itemId, client: clientId } }));
  }

  @Post("/")
  @Returns(ItemGetDto)
  async create(@PathParams("clientId") clientId: number, @BodyParams() item: Item): Promise<ItemGetDto> {
    item.client = clientId;
    return plainToClass(ItemGetDto, await item.save());
  }

  @Put("/:itemId")
  @Returns(ItemGetDto)
  async update(
    @PathParams("clientId") clientId: number,
    @PathParams("itemId") itemId: number,
    @BodyParams() item: Item
  ): Promise<ItemGetDto> {
    const originalItem: Item | undefined = await Item.findOne({ where: { id: itemId, client: clientId } });
    return plainToClass(ItemGetDto, await Object.assign(originalItem, item).save({ reload: true }));
  }

  @Delete("/:itemId")
  @Returns(NOT_FOUND, { description: "Not found" })
  @Returns(NO_CONTENT, { description: "OK" })
  async delete(@PathParams("clientId") clientId: number, @PathParams("itemId") itemId: number): Promise<void> {
    const item: Item | undefined = await Item.findOne({ where: { id: itemId, client: clientId } });
    if (item == undefined) throw new NotFound("Not found");
    // await item.softRemove();
    await item.remove();
  }
}
