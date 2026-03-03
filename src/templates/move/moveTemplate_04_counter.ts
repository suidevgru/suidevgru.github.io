import { FileMap, MoveTemplate, withCommon } from './types';

const README = withCommon(`
# Counter (L14: Write a Minimal Contract)

A minimal counter contract demonstrating struct, entry fun, and object transfer.

## Next steps
1. Open \`sources/my_first_package.move\`.
2. Run \`sui move build\` to compile the package.
3. Call \`create\` to mint a Counter object to yourself.
4. Call \`increment\` to increment the counter value.
`);

const moveToml = (pkg: string) =>
  `[package]
name = "${pkg}"
version = "0.0.1"
edition = "2024.beta"

[dependencies]
Sui = { git = "https://github.com/MystenLabs/sui.git", subdir = "crates/sui-framework/packages/sui-framework", rev = "framework/testnet" }

[addresses]
${pkg} = "0x0"`.trim();

function files(pkg: string): FileMap {
  return {
    'Move.toml': moveToml(pkg),
    'sources/my_first_package.move': `// Paste the counter code from the lesson here`,
    'README.md': README,
  };
}

export const MoveTemplate_L14_Counter: MoveTemplate = {
  id: 'l14_counter',
  label: 'L14: Write a Minimal Contract',
  defaultName: 'my_first_package',
  description: 'Counter with struct and entry fun',
  detail: 'L14 lesson counter contract with create and increment entry functions.',
  files,
};
