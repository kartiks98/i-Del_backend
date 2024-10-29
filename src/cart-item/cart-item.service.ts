import { Injectable } from "@nestjs/common";
import { UpdateCartItem } from "./cart-item.dto";
import { CartItemRepository } from "./cart-item.repository";

@Injectable()
export class CartItemService {
  constructor(private cartItemRepository: CartItemRepository) {}

  async getCartItems() {
    return `This action returns all cartItem`;
  }

  async updateCartItem(id: string, body: UpdateCartItem, username: string) {
    return await this.cartItemRepository.updateCartItem(id, body, username);
  }

  async removeCartItem(id: string) {
    return `This action removes a #${id} cartItem`;
  }
}
