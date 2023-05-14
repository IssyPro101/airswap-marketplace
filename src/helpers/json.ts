export const parseJsonArray = <T>(value: string): T[] => {
  try {
    return JSON.parse(value);
  } catch (e) {
    console.error('Error parsing JSON');

    return [];
  }
};
