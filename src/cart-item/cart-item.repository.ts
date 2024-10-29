import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CartItemEntity } from "./cart-item.entity";
import { UpdateCartItem } from "./cart-item.dto";
import { IPaginationParams } from "src/common/interface";
import { getPaginationParams } from "src/common/methods";

@Injectable()
export class CartItemRepository extends Repository<CartItemEntity> {
  constructor(private dataSource: DataSource) {
    super(CartItemEntity, dataSource.createEntityManager());
  }
  async getCartItems(username: string, paginationParams: IPaginationParams) {
    const { skip, take } = getPaginationParams(paginationParams);
    const cartItems = await this.findAndCount({
      skip,
      take,
      where: { userId: username },
    });
    return cartItems;
  }

  async updateCartItem(id: string, body: UpdateCartItem, username: string) {
    const updatedCartItem = await this.upsert(
      { ...body, productId: id, userId: username },
      ["productId"]
    );
    return updatedCartItem.raw;
  }

  async removeCartItem(id: string, username: string) {
    const deletedCartItem = await this.delete({ id, userId: username });
    if (deletedCartItem.affected === 0)
      throw new NotFoundException("Requested ID Not Found");
    return deletedCartItem.raw;
  }
}