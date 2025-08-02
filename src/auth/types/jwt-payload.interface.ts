import { Role } from 'src/common/enums/role.enums';

export interface JwtPayload {
  sub: string;
  email: string;
  roles: Role[];
}
