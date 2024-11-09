
export function validateId(id) {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
        return { isValid: false, messageErrorId: "O id informado não é um número!" };
    }
    return { isIdValid: true, id: parsedId };
}