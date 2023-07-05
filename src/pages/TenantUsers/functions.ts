import { TableRow } from "../../components/tables/table";
import { User } from "../../types";
import { roleLabels } from "../../utils/texts";

export const mapUsers = (users: User[]): TableRow[] =>
  users.map((user: User) => {
    return {
      id: user.id,
      fullName: `${user.firstName} ${user.lastName}`,
      phone: user.phone,
      email: user.email,
      role: roleLabels[user?.role!]
    };
  });
