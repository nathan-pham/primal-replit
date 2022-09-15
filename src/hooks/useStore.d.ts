export interface Store {
    set: (fn: (state: Store) => void) => void;
    contextId: string;
    context: (string | Store["result"])[];
    result: Record<string, Types>;
}

export type ID = number;
export type Types =
    | {
          type: "object";
          value: Array<{ key: ID; value: ID }>;
      }
    | {
          type: "array";
          value: Array<ID>;
      }
    | {
          type: "error";
          value: {
              name: string;
              message: string;
              stack?: string;
          };
      }
    | { type: "undefined"; value: "" }
    | { type: "null"; value: "" }
    | { type: "string"; value: string }
    | { type: "number"; value: number }
    | { type: "boolean"; value: bolean };
