export const dishes = [
    {
        id: 1,
        name: "Scrambled eggs",
        macronutrients: {
            protein: 20,
            carbs: 1.5,
            calories: 210,
        },
        type: "morning",
    },
    {
        id: 2,
        name: "Ommelete",
        macronutrients: {
            protein: 25,
            carbs: 2,
            calories: 240,
        },
        type: "morning",
    },
] as const;
