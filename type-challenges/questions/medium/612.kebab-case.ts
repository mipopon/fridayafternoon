/*
  612 - KebabCase
  -------
  by Johnson Chu (@johnsoncodehk) #medium #template-literal

  ### Question

  Replace the `camelCase` or `PascalCase` string with `kebab-case`.

  `FooBarBaz` -> `foo-bar-baz`

  For example

  ```ts
  type FooBarBaz = KebabCase<"FooBarBaz">;
  const foobarbaz: FooBarBaz = "foo-bar-baz";

  type DoNothing = KebabCase<"do-nothing">;
  const doNothing: DoNothing = "do-nothing";
  ```

  > View on GitHub: https://tsch.js.org/612
*/

/* _____________ Your Code Here _____________ */

type KebabCase<S extends string, O extends string = ''> = S extends `${infer A}${infer B}${infer R}`
  ? `${Lowercase<B>}${Uppercase<B>}` extends `${B}${B}` // check for non-alphabet characters
    ? KebabCase<`${A}${R}`, `${O}${B}`>
    : B extends Uppercase<B> // check if B is Uppercase
      ? `${Lowercase<A>}${O}-${KebabCase<`${B}${R}`>}`
      : KebabCase<`${A}${R}`, `${O}${B}`>
  : `${Lowercase<S>}${O}`;

// KebabCase<'Foo-Bar'>
// `KebabCase<'FBar', 'oo-'>
// `foo-${KebabCase<'bar'}`
// `foo-${KebabCase<'br', 'a'>}`
// `foo-${KebabCase<'b', 'ar'>}`
// `foo-bar`

// type test<S> = S extends `${infer A}${infer B}${infer R}` ? `${A}${B}` : never;
// type res = test<'😎'> // resolves to '😎'. 4 bytes character emoji is split into A, B
// type res2 = test<'😎😎'> // resolves to '😎'

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/612/answer
  > View solutions: https://tsch.js.org/612/solutions
  > More Challenges: https://tsch.js.org
*/
