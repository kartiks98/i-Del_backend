import { BadRequestException, Injectable } from "@nestjs/common";
import { UpdateCartItem, UpdateQuantityByN } from "./cart-item.dto";
import { CartItemRepository } from "./cart-item.repository";
import { ProductService } from "src/product/product.service";
import { IPaginationParams } from "src/common/interface";
import { REQ_QNTY_NOT_AVAIL_MSG } from "src/common/constants";

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
      throw new BadRequestException(REQ_QNTY_NOT_AVAIL_MSG);
    return await this.cartItemRepository.updateCartItem(id, body, username);
  }

  async updateCartItemQuantityByN(
    id: string,
    body: UpdateQuantityByN,
    username: string,
  ) {
    const { quantityToUpdate, productId, isAdd } = body;
    const { availableQuantity } = await this.productService.getProductInfo(
      username,
      productId,
    );
    const { quantity } = await this.cartItemRepository.getCartItem(
      id,
      username,
    );
    const updatedQuantity = isAdd
      ? quantity + quantityToUpdate
      : quantity - quantityToUpdate;

    if (isAdd) {
      if (updatedQuantity > availableQuantity)
        throw new BadRequestException(REQ_QNTY_NOT_AVAIL_MSG);
    } else if (updatedQuantity < 0)
      throw new BadRequestException(REQ_QNTY_NOT_AVAIL_MSG);

    return await this.cartItemRepository.updateCartItemQuantityByN(
      id,
      updatedQuantity,
      username,
    );
  }

  async toggleCartItemSelect(id: string, username: string) {
    return await this.cartItemRepository.toggleCartItemSelect(id, username);
  }

  async removeCartItem(id: string, username: string) {
    return await this.cartItemRepository.removeCartItem(id, username);
  }

  async removeAllCartItems(username: string) {
    return await this.cartItemRepository.removeAllCartItems(username);
  }
}
