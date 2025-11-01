/**
 * Функция для работы с переменными среды
 * @param name имя переменной среды зарегистрированной в файле .env и next.config.ts
 * @returns 
 */
export function getEnv(name: keyof NodeJS.ProcessEnv): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
}
