import { Role } from 'src/common/enums/role.enums';

export class UserResponseDto {
  id: string;
  email: string;
  name: string;
  roles: Role[];
  createdAt: Date;
}
