export type TokenApi = UserToken

export type UserToken = {
    iat: number
    exp: number
    roles: RoleUser[]
    id: string
}
export type RoleUser =
    | "ROLE_USER"
    | "ROLE_ADMIN"
    | "ROLE_EMPLOYEE"
    | "ROLE_ORGANIZATION"