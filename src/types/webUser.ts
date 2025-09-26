import type { User } from "firebase/auth"
import type { Customer } from "./customer"

export type WebUser = {
    id: string
    name: string
    customer: Customer
    firebaseUser?: User | null
}