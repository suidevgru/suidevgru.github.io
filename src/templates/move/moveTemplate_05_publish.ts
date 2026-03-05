import { FileMap, MoveTemplate, withCommon } from './types';

const README = withCommon(`
# Counter (L16: Publish a Contract)

The complete counter contract from L14/L15, ready to compile and publish.

## Steps
1. Click **Compile** and wait for "Build done."
2. Connect your wallet (top-right) to **Devnet** if not already connected.
3. Click **Publish** — approve the transaction in your wallet popup.
4. Copy the **Package ID** shown below the buttons.
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

const moveSource = `module my_first_package::counter {
    /// Counter object
    public struct Counter has key {
        id: UID,
        value: u64,
    }

    /// Create a counter and transfer it to the sender
    entry fun create(ctx: &mut TxContext) {
        let counter = Counter {
            id: object::new(ctx),
            value: 0,
        };
        transfer::transfer(counter, ctx.sender());
    }

    /// Increment the counter value by 1
    entry fun increment(counter: &mut Counter) {
        counter.value = counter.value + 1;
    }

    /// Return the current value of the counter
    public fun get_value(counter: &Counter): u64 {
        counter.value
    }

    // === Tests ===

    #[test]
    fun test_increment() {
        let mut ctx = tx_context::dummy();
        let mut counter = Counter {
            id: object::new(&mut ctx),
            value: 0,
        };
        increment(&mut counter);
        assert!(get_value(&counter) == 1, 0);
        let Counter { id, value: _ } = counter;
        object::delete(id);
    }
}`;

function files(pkg: string): FileMap {
  return {
    'Move.toml': moveToml(pkg),
    'sources/my_first_package.move': moveSource,
    'README.md': README,
  };
}

export const MoveTemplate_L16_CounterPublish: MoveTemplate = {
  id: 'l16_counter_publish',
  label: 'L16: Publish a Contract',
  defaultName: 'my_first_package',
  description: 'Counter contract ready to publish',
  detail: 'Complete counter contract (with tests) from L14/L15, pre-filled and ready to compile and publish to Devnet.',
  files,
};
