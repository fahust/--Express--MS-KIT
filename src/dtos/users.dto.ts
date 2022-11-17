import { IsArray, IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public product: string;

  @IsString()
  public locale: string;

  @IsString()
  public thumbnail: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public userName: string;

  @IsArray()
  public phones: string;

  @IsBoolean()
  public hasNewsletter: string;

  @IsArray()
  public permissions: string;
}
