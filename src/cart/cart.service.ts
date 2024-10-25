import { Injectable } from "@nestjs/common";
import { AddToCart, UpdateCartItem } from "./cart.dto";
import { CartRepository } from "./cart.repository";
import { CartEntity } from "./cart.entity";

@Injectable()
export class CartService {
  constructor(private cartRepository: CartRepository) {}

  async create(username, body: AddToCart) {
    this.cartRepository.addToCart(username, body);
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: string) {
    return `This action returns a #${id} cart`;
  }

  update(id: string, updateCartItem: UpdateCartItem) {
    return `This action updates a #${id} cart`;
  }

  remove(id: string) {
    return `This action removes a #${id} cart`;
  }
}
