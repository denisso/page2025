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
