Monorepo for all my eslint & prettier stuff, in a easily sharable form.

# Installation

```bash
npm install --dev @rixo/eslint-config
```

You can have your `.eslintrc` and `.prettierrc` files can be created automatically for you by running the provided script:

```bash
npm run rixo-eslint-init
```

If these files already exists in your project, then they won't be touched.

Not too sure about Windows support currently, but if the script doesn't work for you, you can refer to the variants section to create the files yourself.

# Usage

Just use eslint, & prettier...

```bash
npx eslint src

npx prettier 'src/**/*'

npx prettier --write 'src/**/*'
```

You can customize your rules in `.eslintrc` too.

# Customization

## Disable plugin

All variants include [eslint-plugin-disable][eslint-plugin-disable] so you can always disable a plugin that was added automatically, if the combination does not work well for you.

`eslint-plugin-disable` supports disabling in `.eslintrc` or on a per-file basis, with a comment:

```js
/* eslint-plugin-disable import, prettier */
```

# Variants

Note: the example bellow use the shortcut form of extends, but feel free to use an array if you want to extend from other config.

Example:

```yml
# .eslintrc
extends:
  - '@rixo'
  - 'plugin:whatever'
```

## Default

```yml
# .eslintrc
extends: '@rixo'
```

## Svelte

With added support for Svelte syntax (in both eslint & prettier).

```yml
# .eslintrc
extends: '@rixo/svelte'
```

## Atom

Specific rules for development of Atom packages.

```yml
# .eslintrc
extends: '@rixo/atom'
```

[eslint-plugin-disable]: https://github.com/mradionov/eslint-plugin-disable
