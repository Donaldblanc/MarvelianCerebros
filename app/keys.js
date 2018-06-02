require("dotenv").config();

export const marvel = {
    public_key: process.env.MARVEL_PUBLIC_KEY,
    private_key: process.env.MARVEL_PRIVATE_KEY,
};

