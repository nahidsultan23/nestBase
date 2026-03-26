import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class OwnerRegistrationDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Must be at least 8 characters long' })
  password: string;
}
