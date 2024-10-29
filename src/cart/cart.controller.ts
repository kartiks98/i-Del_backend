import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { AddToCart, UpdateCartItem } from "./cart.dto";
import { Username } from "src/common/decorators";

@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Username() username, @Body() body: AddToCart) {
    return this.cartService.create(username, body);
  }

  @Get()
  getCarts() {
    return this.cartService.getCarts();
  }

  @Delete(":id")
  deleteCart(@Param("id") id: string) {
    return this.cartService.deleteCart(id);
  }
}
