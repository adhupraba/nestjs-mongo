import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

class UpdateUser {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  favoriteFoods: string[];

  @IsNumber()
  @IsOptional()
  age: number;
}

export class UpdateUserDto extends PartialType(UpdateUser) {}
