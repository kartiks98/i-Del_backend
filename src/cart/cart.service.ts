import { Injectable } from "@nestjs/common";
import { AddToCart, UpdateCartItem } from "./cart.dto";
import { CartRepository } from "./cart.repository";

@Injectable()
export class CartService {
  constructor(private cartRepository: CartRepository) {}

  async create(username, body: AddToCart) {
    this.cartRepository.addToCart(username, body);
  }

  getCarts() {
    return `This action returns all cart`;
  }

  deleteCart(id: string) {
    return `This action removes a #${id} cart`;
  }
}
