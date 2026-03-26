import type { Response } from 'express';
import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { createResponse } from '../common/filters/response.filter';
import { AuthService } from './auth.service';
import { OwnerRegistrationDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('owner/registration')
  async ownerRegistration(
    @Body(ValidationPipe) ownerRegistrationObj: OwnerRegistrationDto,
    @Res() res: Response,
  ) {
    const result =
      await this.authService.ownerRegistration(ownerRegistrationObj);
    return res.status(result.statusCode).json(createResponse(result));
  }
}
