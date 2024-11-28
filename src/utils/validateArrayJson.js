
export function validateArrayJson(field, name) {

    let statusCode, message, error;

    let isValidArray = true;

    try {
        field = JSON.parse(field);
        if (!Array.isArray(field)) {
            statusCode = 400;
            message = `${name} deve ser um array válido.`;
            isValidArray = false;
            return { statusCode, message, isValidArray, error };
        }
    } catch (error) {
        statusCode = 500;
        message = `Erro ao processar o campo '${name}'.`;
        error = error.message;
        isValidArray = false;
        return { statusCode, message, isValidArray, error };
    }

    return { statusCode, message, isValidArray, error };

}