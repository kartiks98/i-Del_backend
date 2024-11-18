import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CartItemService } from "./cart-item.service";
import { UpdateCartItem, UpdateQuantityByN } from "./cart-item.dto";
import { PaginationParamsDecorator, Username } from "src/common/decorators";
import { IPaginationParams } from "src/common/interface";
import { AnyAuthGuard } from "src/common/anyAuth.guard";

@Controller("cart-item")
@UseGuards(AnyAuthGuard)
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Get("/list/:limit/:pageNumber")
  getCartItems(
    @Username() username,
    @PaginationParamsDecorator() paginationParams: IPaginationParams
  ) {
    return this.cartItemService.getCartItems(username, paginationParams);
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

  @Patch("/toggle-item-select/:id")
  toggleCartItemSelect(@Param("id") id: string, @Username() username: string) {
    return this.cartItemService.toggleCartItemSelect(id, username);
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
