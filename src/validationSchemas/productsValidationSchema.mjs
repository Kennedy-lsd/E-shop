export const createProductValidation = {
    title: {
        isString: {
            errorMessage: "Title must be a string"
        },
        notEmpty: {
            errorMessage: "Title can't be empty"
        }
    },
    rating: {
        isLength: {
            min: 0,
            max: 5,
        },
        notEmpty: {
            errorMessage: "Required rating"
        },
        isDecimal: {
            errorMessage: "Rating must be a number"
        }
    },
    colorway: {
        isString: {
            errorMessage: "Color must be a string"
        },
        notEmpty: {
            errorMessage: "Color can't be empty"
        }
    },
    brand: {
        isString: {
            errorMessage: "Brand must be a string"
        },
        notEmpty: {
            errorMessage: "Brand can't be empty"
        }
    },
    model: {
        isString: {
            errorMessage: "Model must be a string"
        },
        notEmpty: {
            errorMessage: "Model can't be empty"
        }
    },
    code: {
        isString: {
            errorMessage: "Code must be a string"
        },
        notEmpty: {
            errorMessage: "Code can't be empty"
        },
        isLength: {
            options: { min: 9, max: 14 },
            errorMessage: "Code must be longer than 8"
        }
    }
}