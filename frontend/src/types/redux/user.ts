import type {RoleUser} from "@/types/redux/token"

export type reduxStatus = RoleUser | "ROLE_USER"

export type reduxUserFront = {
    email: string
    status: reduxStatus[]
}