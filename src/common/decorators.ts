import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IHeaders } from "./interface";
import { getUserDetails } from "./methods";

export const PaginationParamsDecorator = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const { params } = ctx.switchToHttp().getRequest();
    const { limit, pageNumber } = params;
    return { limit: +limit, pageNumber: +pageNumber };
  },
);

export const Username = createParamDecorator(
  async (_, ctx: ExecutionContext) => {
    const { headers }: { headers: IHeaders } = ctx.switchToHttp().getRequest();
    const accessToken = headers?.authorization;
    return await getUserDetails(accessToken);
  },
);
