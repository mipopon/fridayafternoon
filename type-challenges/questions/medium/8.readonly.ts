/*
  8 - Readonly 2
  -------
  by Anthony Fu (@antfu) #medium #readonly #object-keys

  ### Question

  Implement a generic `MyReadonly2<T, K>` which takes two type argument `T` and `K`.

  `K` specify the set of properties of `T` that should set to Readonly. When `K` is not provided, it should make all properties readonly just like the normal `Readonly<T>`.

  For example

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  todo.completed = true // OK
  ```

  > View on GitHub: https://tsch.js.org/8
*/

/* _____________ Your Code Here _____________ */

// initial solution
// type MyReadonly2<T, K extends keyof T | undefined = undefined> = Equal<K, undefined> extends true
//   ? Readonly<T>
//   : { readonly [RoP in keyof T as Extract<RoP,K>]: T[RoP] } & { [P in keyof T as Exclude<P, K>]: T[P] }

// cleaned up
// type MyReadonly2<T, K extends keyof T = keyof T> = { readonly [RoP in keyof T as Extract<RoP,K>]: T[RoP] } & { [P in keyof T as Exclude<P, K>]: T[P] }

// cleanest solution using intersection
type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> & Readonly<T>;


// this doesn't work because optional property is not preserved when modifying
type IncorrectReadonly2<T, K extends keyof T = keyof T> = { readonly [RoP in Extract<keyof T,K>]: T[RoP] } & { [P in Exclude<keyof T, K>]: T[P] }

type a = Prettier<MyReadonly2<Todo1, 'title' | 'description'>>
type b = IncorrectReadonly2<Todo1, 'title' | 'description'>

type Prettier<T> = { [P in keyof T]: T[P]}

/* _____________ Test Cases _____________ */
import type { Alike, Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description'>, Expected>>,
];

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>;

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8/answer
  > View solutions: https://tsch.js.org/8/solutions
  > More Challenges: https://tsch.js.org
*/
