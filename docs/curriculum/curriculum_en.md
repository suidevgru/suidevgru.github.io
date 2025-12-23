# Sui Beginner Tutorial Curriculum

## Summary

A step-by-step curriculum for learning from Sui basics to dApp development. The beginner track (Modules 1-5) provides a complete cycle of the development flow: "Write → Deploy → Execute → Compose with PTB", while the advanced track (Module 6) covers advanced patterns.

### Beginner Track (Modules 1-5)

| Module | Content | Goal |
|:--|:--|:--|
| 1 | Environment Setup (CLI, Wallet, VSCode) | Development environment is ready and connected to Devnet |
| 2 | Devnet Practice + PTB Builder | Understand transaction mechanics and compose operations with PTB Builder |
| 3 | Move Essentials (Write → Deploy → Call) | Publish your own contract and make one call |
| 4 | TypeScript SDK Core | Build PTB in TS, sign → execute → verify results |
| 5 | Capstone + Walrus Sites | Deploy an integrated dApp with Move + frontend |

### Advanced Track (Module 6)

| Module | Content |
|:--|:--|
| 6 | Advanced Move + SDK Applications |

**Target Network:** Devnet

---

## Module 1: Environment Setup

Set up all the tools needed for development and connect to Devnet.

### 1.1 Basic Concepts

| Page ID | Title | Learning Objectives | Hands-on |
|:--|:--|:--|:--|
| 1.1.1 | Blockchain Basics | Understand distributed ledgers, consensus, and transactions | Concept verification with simple examples |
| 1.1.2 | Sui's Object-Centric Model | Understand Sui's ownership model (Address-owned / Shared / Immutable) | Review ownership examples |

### 1.2 Development Environment Setup

| Page ID | Title | Learning Objectives | Hands-on |
|:--|:--|:--|:--|
| 1.2.1 | Slush (Wallet) Installation | Install browser extension and create an address | Create new → Backup → Switch to Devnet |
| 1.2.2 | Sui CLI Installation | Install CLI with `suiup` and complete initial setup | `suiup` → `sui --version` → `sui client` |
| 1.2.3 | VSCode + Sui Extension | Set up Move development environment | Install Sui Extension → Verify syntax highlighting |
| 1.2.4 | Devnet Connection | Connect CLI to Devnet | `sui client switch --env devnet` → Verify |
| 1.2.5 | Get Tokens from Faucet | Obtain test SUI | `sui client faucet` → `sui client gas` |

**Checkpoint:** OK if `sui client active-env` returns `devnet` and balance is displayed

---

## Module 2: Devnet Practice

Execute transactions on Devnet and experience composing operations with PTB Builder.

### 2.1 Transactions and Objects

| Page ID | Title | Learning Objectives | Hands-on |
|:--|:--|:--|:--|
| 2.1.1 | Reading Transactions in Explorer | Be able to read transaction inputs/outputs/object changes | Transfer tx → Verify in Explorer |
| 2.1.2 | Transfers and Gas | Get a feel for gas costs | Small transfer → Observe balance difference |

### 2.2 Composing with PTB Builder

| Page ID | Title | Learning Objectives | Hands-on |
|:--|:--|:--|:--|
| 2.2.1 | PTB Builder Introduction | Experience combining multiple operations into one tx using GUI | Compose transfer+transfer in PTB Builder → Execute |
| 2.2.2 | PTB → TypeScript Export | Understand the flow of converting GUI-created PTB to TS code | Export → Review code → Preview recreation in Module 4 |

**Checkpoint:** OK if a tx with 2 operations composed in PTB Builder succeeds

---

## Module 3: Move Essentials

Achieve "Write → Deploy → Call" in the shortest path. Advanced patterns are covered in Module 6.

### 3.1 First Steps with Move

| Page ID | Title | Learning Objectives | Hands-on |
|:--|:--|:--|:--|
| 3.1.1 | Move Overview | Grasp the concepts of resources, modules, and packages | Read the structure |
| 3.1.2 | Project Creation | Be able to create a Move package | `sui move new` → Verify `Move.toml` |
| 3.1.3 | Minimal Contract Implementation | Be able to implement struct / entry function | Implement Counter or Greeting |
| 3.1.4 | Build and Test | Be able to build and test locally | `sui move build` → `sui move test` |

### 3.2 Deploy and Call

| Page ID | Title | Learning Objectives | Hands-on |
|:--|:--|:--|:--|
| 3.2.1 | Publish to Devnet | Deploy contract and obtain Package ID | `sui client publish` → Verify in Explorer |
| 3.2.2 | Call Functions from Explorer | Execute contract functions via GUI | Search Package ID in Explorer → Execute → Verify results |
| 3.2.3 | Call Functions from CLI | Execute contract functions via CLI | `sui client call` → Verify results |

**Checkpoint:** OK if you publish your own contract and successfully call it from both Explorer and CLI

---

## Module 4: TypeScript SDK Core

Build PTB in TS and achieve sign → execute → verify results. Advanced features are covered in Module 6.

### 4.1 SDK Basics

| Page ID | Title | Learning Objectives | Hands-on |
|:--|:--|:--|:--|
| 4.1.1 | SDK Overview | Understand the roles of `@mysten/sui` and `@mysten/dapp-kit` | Review package structure |
| 4.1.2 | Connect with SuiClient | Be able to connect to network and fetch data | Live execute `getBalance` |
| 4.1.3 | Transaction Class | Be able to build PTB in TS | Recreate Module 2's PTB in TS |

### 4.2 Signing and Execution

| Page ID | Title | Learning Objectives | Hands-on |
|:--|:--|:--|:--|
| 4.2.1 | Provider Configuration | Understand the foundation of dApp Kit | Review Provider hierarchy |
| 4.2.2 | Wallet Connection | Be able to connect wallet with ConnectButton | Connect → Display address |
| 4.2.3 | Sign and Execute Transaction | Be able to sign and send tx from frontend | Call Module 3's contract with `useSignAndExecuteTransaction` |
| 4.2.4 | Result Verification | Be able to reflect tx results in UI | Display success/failure in UI |

**Checkpoint:** OK if a tx built in TS successfully goes through wallet signing → execution → result display

---

## Module 5: Capstone

Deploy a dApp integrating Move + frontend on Walrus Sites.

### 5.1 dApp Integration

| Page ID | Title | Learning Objectives | Hands-on |
|:--|:--|:--|:--|
| 5.1.1 | Project Design | Organize the overall structure of Move + frontend | Review the structure |
| 5.1.2 | Integration Implementation | Integrate Module 3's contract + Module 4's frontend | Verify locally |

### 5.2 Walrus Sites Deployment

| Page ID | Title | Learning Objectives | Hands-on |
|:--|:--|:--|:--|
| 5.2.1 | site-builder Setup | Prepare the deployment tool | Install site-builder |
| 5.2.2 | Deploy and Publish | Publish the built frontend | `site-builder deploy` → Verify URL |

### 5.3 Completion and Next Steps

| Page ID | Title | Learning Objectives | Hands-on |
|:--|:--|:--|:--|
| 5.3.1 | Review | Organize what you've learned | Review checklist |
| 5.3.2 | To Advanced Track | Understand what Module 6 covers | Review table of contents |

**Checkpoint:** OK if dApp works at Walrus Sites URL

---

## Module 6: Advanced Move + SDK Applications (Advanced Track)

Covers advanced topics moved from Modules 3 and 4.

### 6.1 Advanced Move Patterns

- **Ability Details** - Combination patterns of copy / drop / store / key
- **Generics** - Type parameters, phantom types
- **OTW / init Function** - Package initialization, Publisher acquisition
- **Events** - `sui::event::emit`, off-chain tracking
- **Shared Objects** - Consensus, cost characteristics
- **Dynamic Fields** - Parent-child object relationships
- **Collections** - Table, Bag, ObjectTable, ObjectBag
- **Witness Pattern** - Type-level authentication
- **Hot Potato Pattern** - Forced consumption
- **Capability Pattern** - AdminCap, permission control
- **UpgradeCap** - Package upgrades
- **Kiosk / TransferPolicy** - NFT trading standard
- **BCS** - Binary serialization
- **Enum / Match** - Move 2024 new features

### 6.2 SDK Applications

- **Dry Run** - Transaction simulation
- **Event Queries** - `queryEvents`
- **Sponsored Transactions** - Gasless UX
- **GraphQL API** - Flexible data queries
- **zkLogin** - Wallet generation via OAuth authentication
- **Kiosk SDK** - NFT marketplace
- **BCS (SDK)** - Frontend ⇔ Contract integration
- **Multisig** - Multisig wallets

### 6.3 Sui Stack

- **Walrus** - Distributed storage details
- **Seal** - Encryption
- **MVR** - Move Registry
- **DeepBook** - DEX
- **Nautilus** - Off-chain computation

---

## Appendix: Page Structure

Each page follows a unified format:

1. **Concept** - Conceptual explanation (keep it brief)
2. **Hands-on** - Hands-on steps
3. **Checkpoint** - How to verify success
4. **Pitfalls** - Common errors and solutions
