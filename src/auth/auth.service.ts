import { HttpStatus, Injectable } from '@nestjs/common';
import { ImethodCommonResponse } from '../common/interfaces/common.interface';
import { OwnerRegistrationDto } from './auth.dto';

@Injectable()
export class AuthService {
  async ownerRegistration(
    ownerRegistrationObj: OwnerRegistrationDto,
  ): Promise<ImethodCommonResponse> {
    const res = {
      statusCode: HttpStatus.CREATED,
      message: 'Owner registration successful',
      data: {
        email: ownerRegistrationObj.email,
        registrationId: 'dummy-registration-id-12345',
        createdAt: new Date().toISOString(),
      },
    };

    return res;
  }
}
