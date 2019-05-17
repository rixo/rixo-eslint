Monorepo for all my eslint & prettier stuff, in a easily sharable form.

# Installation

```bash
npm install --dev @rixo/eslint-config
```

A `.eslintrc` and `.prettierrc` will be created in your project by a npm postinstall script. If these files already exists in your project, then they won't be touched.

In some cases, depending on the order you run your `npm install` commands, the files may not be created or may target the wrong variant. In case of problem, refer to the [variants](#variants) section bellow and fix it!

# Usage

Just use eslint, & prettier...

```bash
npx eslint src

npx prettier 'src/**/*'

npx prettier --write 'src/**/*'
```

You can customize your rules in `.eslintrc` too.

# Variants

## Default

```yml
# .eslintrc
extends: '@rixo'
```

## Atom

```yml
# .eslintrc
extends: '@rixo/atom'
```
