/**
 * Generates a random alphanumeric string with a length between 6 and 8 characters.
 * This matches the regex: /^[A-Za-z0-9]{6,8}$/
 *
 * @returns {string} The randomly generated string.
 */
export const generateShortCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const minLength = 6;
  const maxLength = 8;

  const stringLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < stringLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result.toLowerCase();
};