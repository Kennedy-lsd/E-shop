import bcypt from 'bcrypt'

const Rounds = 10

const hashPassword = async (password) => {
    const salt = await bcypt.genSalt(Rounds)
    return bcypt.hash(password, salt)
}

const comparePassword = (password, hashed) => {
    return bcypt.compareSync(password, hashed)
}

export {hashPassword, comparePassword}