import { Role } from 'src/common/enums/role.enums';

export class CreateUserDto {
  id: string;
  name: string;
  email: string;
  roles: Role[] | undefined;
  password: string;
  createdAt: Date;
}

export class LoginDto {
  email: string;
  password: string;
}
