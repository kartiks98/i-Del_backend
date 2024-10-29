import { Controller, Get, Body, Patch, Param, Delete } from "@nestjs/common";
import { CartItemService } from "./cart-item.service";
import { UpdateCartItem } from "./cart-item.dto";
import { Username } from "src/common/decorators";

@Controller("cart-item")
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Get()
  getCartItems() {
    return this.cartItemService.getCartItems();
  }

  @Patch(":id")
  updateCartItem(
    @Param("id") id: string,
    @Body() body: UpdateCartItem,
    @Username() username
  ) {
    return this.cartItemService.updateCartItem(id, body, username);
  }

  @Delete(":id")
  removeCartItem(@Param("id") id: string) {
    return this.cartItemService.removeCartItem(id);
  }
}
