export type User = {
    email: string;
    password: string;
    name: string;
};

export type Error = {
    show: boolean;
    text: string;
};

export type FetchedUser = {
    userId: number;
    username: string;
    iat: number;
    exp: number;
};
