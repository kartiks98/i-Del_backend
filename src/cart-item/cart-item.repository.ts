import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CartItemEntity } from "./cart-item.entity";
import { UpdateCartItem } from "./cart-item.dto";

@Injectable()
export class CartItemRepository extends Repository<CartItemEntity> {
  constructor(private dataSource: DataSource) {
    super(CartItemEntity, dataSource.createEntityManager());
  }
  async updateCartItem(id: string, body: UpdateCartItem, username: string) {
    const updatedCartItem = await this.upsert(
      { ...body, productId: id, userId: username },
      ["productId"]
    );
    return updatedCartItem.raw;
  }
}
