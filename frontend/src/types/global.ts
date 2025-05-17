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
    name: string;
    portion: number;
    calories: number;
    macronutrients: {
        protein: number;
        carbohydrates: number;
    };
};

export type Day = {
    date: string;
    food: Meal[];
};
