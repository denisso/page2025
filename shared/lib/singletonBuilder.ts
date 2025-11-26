/**
 * Создаёт ленивый синглтон с проверкой среды выполнения (client/server).
 * Экземпляр создаётся при первом вызове и повторно не инициализируется.
 *
 * @template TConstructor — Тип создаваемого экземпляра.
 * @template Args — Тип аргументов, передаваемых в конструктор.
 *
 * @param Constructor — Класс, экземпляр которого должен быть создан как синглтон.
 * @param args — Аргументы, передаваемые в конструктор.
 * @param type — Среда, в которой разрешено создавать экземпляр: `client` или `server`.
 *
 * @returns Функцию, возвращающую единственный экземпляр указанного класса.
 */

function singletonBuilder<TConstructor, Args>(
  Constructor: new (args: Args) => TConstructor,
  args: Args,
  type: "client" | "server"
): () => TConstructor {
  let inst: TConstructor | null = null;
  return () => {
    if (!inst) {
      if (
        (type == "server" && typeof window === "undefined") ||
        (type == "client" && typeof window !== "undefined")
      ) {
        inst = new Constructor(args);
      } else {
        throw new Error(Constructor.name + " is not available on the " + type);
      }
    }
    return inst as TConstructor;
  };
}

export function serverSingletonBuilder<TConstructor, Args>(
  Constructor: new (args: Args) => TConstructor,
  args: Args
): () => TConstructor {
  return singletonBuilder(Constructor, args, "server");
}

export function clientSingletonBuilder<TConstructor, Args>(
  Constructor: new (args: Args) => TConstructor,
  args: Args
): () => TConstructor {
  return singletonBuilder(Constructor, args, "client");
}
