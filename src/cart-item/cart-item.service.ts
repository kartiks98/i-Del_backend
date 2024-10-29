import { BadRequestException, Injectable } from "@nestjs/common";
import { UpdateCartItem } from "./cart-item.dto";
import { CartItemRepository } from "./cart-item.repository";
import { ProductService } from "src/product/product.service";
import { IPaginationParams } from "src/common/interface";

@Injectable()
export class CartItemService {
  constructor(
    private cartItemRepository: CartItemRepository,
    private productService: ProductService,
  ) {}

  async getCartItems(username: string, paginationParams: IPaginationParams) {
    return await this.cartItemRepository.getCartItems(
      username,
      paginationParams,
    );
  }

  async updateCartItem(id: string, body: UpdateCartItem, username: string) {
    const { productId, quantity } = body;
    const { availableQuantity } = await this.productService.getProductInfo(
      username,
      productId,
    );
    if (quantity > availableQuantity)
      throw new BadRequestException(
        "Requested quantity for the product not available",
      );
    return await this.cartItemRepository.updateCartItem(id, body, username);
  }

  async removeCartItem(id: string, username: string) {
    return await this.cartItemRepository.removeCartItem(id, username);
  }
}
