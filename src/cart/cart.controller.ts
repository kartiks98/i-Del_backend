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
  findAll() {
    return this.cartService.findAll();
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCartItem: UpdateCartItem) {
    return this.cartService.update(id, updateCartItem);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cartService.remove(id);
  }
}
