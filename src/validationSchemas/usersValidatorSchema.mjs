export const createUserValidationSchema = {
    email: {
        notEmpty: {
            errorMessage: "Email can't be empty"
        },
        isString: {
            errorMessage: "Email must be a string"
        }
    },
    username: {
        notEmpty: {
            errorMessage: "Username can't be empty"
        },
        isString: {
            errorMessage: "Username must be a string"
        }
    },
    password: {
        notEmpty: true,
        isString: {
            errorMessage: "Password must be a string"
        }
    }
}