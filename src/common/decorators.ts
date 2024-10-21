import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const PaginationParamsDecorator = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const { params } = ctx.switchToHttp().getRequest();
    const { limit, pageNumber } = params;
    return { limit: +limit, pageNumber: +pageNumber };
  },
);
