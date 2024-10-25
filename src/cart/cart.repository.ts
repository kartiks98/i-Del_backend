import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CartEntity } from "./cart.entity";
import { AddToCart } from "./cart.dto";
import { ProductEntity } from "src/product/product.entity";

@Injectable()
export class CartRepository extends Repository<CartEntity> {
  constructor(private dataSource: DataSource) {
    super(CartEntity, dataSource.createEntityManager());
  }
  async addToCart(username, body: AddToCart) {
    const { productId } = body;
    const productEntity = new ProductEntity();
    productEntity.id = productId;
    productEntity.isSelected = true;
    const cartItem = this.create({
      ...body,
      products: [productEntity],
      userId: username,
    });
  }
}
