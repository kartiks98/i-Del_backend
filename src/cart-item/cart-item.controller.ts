import { Controller, Get, Body, Patch, Param, Delete } from "@nestjs/common";
import { CartItemService } from "./cart-item.service";
import { UpdateCartItem, UpdateQuantityByN } from "./cart-item.dto";
import { PaginationParamsDecorator, Username } from "src/common/decorators";
import { IPaginationParams } from "src/common/interface";

@Controller("cart-item")
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Get("/list/:limit/:pageNumber")
  getCartItems(
    @Username() Username,
    @PaginationParamsDecorator() paginationParams: IPaginationParams
  ) {
    return this.cartItemService.getCartItems(Username, paginationParams);
  }

  @Patch(":id")
  updateCartItem(
    @Param("id") id: string,
    @Body() body: UpdateCartItem,
    @Username() username
  ) {
    return this.cartItemService.updateCartItem(id, body, username);
  }

  @Patch("/update-quantity/:id")
  increaseCartItemQuantityByN(
    @Param("id") id: string,
    @Body() body: UpdateQuantityByN,
    @Username() username: string
  ) {
    return this.cartItemService.updateCartItemQuantityByN(id, body, username);
  }

  @Delete(":id")
  removeCartItem(@Param("id") id: string, @Username() username) {
    return this.cartItemService.removeCartItem(id, username);
  }

  @Delete()
  removeAllCartItems(@Username() username) {
    return this.cartItemService.removeAllCartItems(username);
  }
}
