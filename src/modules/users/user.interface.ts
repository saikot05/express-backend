export interface IUser {
    name: string;
    email: string;
    password: string;
    age?: number | null;
    is_Active?: boolean;
}

export type IUpdateUser = Partial<Pick<IUser, "name" | "password" | "age" | "is_Active" >>