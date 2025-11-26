/**
 * Возвращает значение переменной окружения и выбрасывает ошибку,
 * если переменная не определена.
 *
 * @param name — ключ переменной окружения, объявленный в `.env` и `next.config.ts`.
 * @returns Строковое значение переменной окружения.
 */
export function getEnv(name: keyof NodeJS.ProcessEnv): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
}
