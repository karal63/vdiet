export type User = {
    email: string;
    password: string;
    name: string;
};

export type Error = {
    show: boolean;
    text: string;
};

export type LoggedUser = {
    userId: number;
    username: string;
    iat: number;
    exp: number;
};

export type Meal = {
    id?: string;
    name: string;
    category: string;
    portion: number;
    calories: number;
    macronutrients: {
        protein: number;
        carbohydrates: number;
    };
};

export type Water = {
    id?: string;
    amountMl: number;
};

export type Day = {
    date: string;
    food: Meal[];
    waterIntake: Water[];
};

export type ProfileMenuExposed = {
    menuRef: HTMLElement | null;
};
