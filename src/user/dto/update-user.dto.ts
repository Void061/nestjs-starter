import { PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from '@/user/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class SwitchThemeDTO {
  themeName: string;
}

export class ChangeCountryDTO {
  countryName: string;
}

export class UpdateUserProfileDTO {
  name: string;
  surname: string;
}
