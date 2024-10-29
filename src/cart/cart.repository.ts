import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CartEntity } from "./cart.entity";
import { AddToCart } from "./cart.dto";

@Injectable()
export class CartRepository extends Repository<CartEntity> {
  constructor(private dataSource: DataSource) {
    super(CartEntity, dataSource.createEntityManager());
  }
  async addToCart(username, body: AddToCart) {
    const cartItem = this.create({
      ...body,
      userId: username,
    });
  }
}
