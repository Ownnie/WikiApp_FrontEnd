import { useWiki } from "../context/WikiContext";
import { User } from "../types/index";
import UserCard from "./UserCard";

export default function UserList() {
    const { data } = useWiki();
    const users = data as User[];

    return (
        <div className="grid grid-cols-1 gap-4 w-2/3 mx-auto py-5">
            {users.map((user) => (
                <UserCard
                    key={user.id}
                    nombre={user.nombre}
                    apellido={user.apellido}
                    email={user.email}
                    rol={user.rol}
                />
            ))}
        </div>
    );
}
