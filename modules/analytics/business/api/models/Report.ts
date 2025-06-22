import { Client } from "./Client";

export type Report = {
    clients: Client[];
    meta: {
        recordTotal: number;
        page: number;
    }
};