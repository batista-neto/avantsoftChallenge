import { User } from "modules/account/business/api/models/User";

export type Client = {
    user: User;
    statistics: {
        sales: Sales[];
    };
}

type Sales = {
    data: string;
    valor: number;
}