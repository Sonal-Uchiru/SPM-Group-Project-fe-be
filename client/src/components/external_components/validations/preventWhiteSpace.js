export const handleKeyDown = (e) => {
    if (e.key === " ") {
        e.preventDefault();
    }

};
export const handleChangeWhiteSpace = (e) => {
    e.target.value = e.target.value.trim();
};