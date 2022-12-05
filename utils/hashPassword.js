import bcrypt from 'bcrypt';

const saltRounds = 10;


const hashPassword = async (plainPassword) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainPassword,salt);
    return hash;
};


const hashValidator = async(plainPassword,hashedPassword) => {
    const result = await bcrypt.compare(plainPassword,hashedPassword);
    return result;
};
export {
    hashPassword,
    hashValidator
}