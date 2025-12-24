# Sui Beginner Tutorial Curriculum

## Course Overview

A beginner-friendly course to learn Sui from the basics to dApp deployment in stages. You will gain the skills to publish dApps while experiencing a professional workflow utilizing the **Sui Extension** and **PTB Builder**.

### Beginner Course (6 Units)

| Unit | Content | Deliverable |
|:--|:--|:--|
| 1 | Environment Setup & Devnet Connection | Connected to Devnet and obtained tokens via Faucet |
| 2 | Transactions & PTB Builder | Successfully executed a tx combining 2 operations in PTB Builder |
| 3 | Publishing Move | Published your own contract and called it via Explorer |
| 4 | Building PTB with TS | Built a PTB in TS; succeeded in Signing -> Execution -> Result Verification |
| 5 | UI Completion with dapp-kit | Wallet connection and result display working on the UI |
| 6 | Deployment & Next Steps | Published the dApp and completed the course |

**Prerequisite Network:** Devnet

---

## Unit 1: Environment Setup & Devnet Connection

**Deliverable**: Connected to Devnet and obtained tokens via Faucet

### Lessons

| ID | Title | Goal | Do | Success Check | Tools | Next |
|:--|:--|:--|:--|:--|:--|:--|
| L1 | Install Slush Wallet | Install the wallet | 1. Install Chrome extension<br>2. Create account<br>3. Verify backup | Address is displayed in the wallet | Slush | Let's switch to Devnet |
| L2 | Switch to Devnet | Change network to Devnet | 1. Open settings<br>2. Select Devnet | Wallet displays "Devnet" | Slush | Let's introduce the CLI |
| L3 | Install Sui CLI | Install command line tools | 1. Run suiup command<br>2. Verify version | `sui --version` succeeds | CLI | Setup development in VSCode |
| L4 | VSCode + Sui Extension | Setup Move dev environment | 1. Install Sui Extension<br>2. Verify settings | .move files show syntax highlighting | **Sui Extension** | Connect CLI to Devnet |
| L5 | Connect CLI to Devnet | Configure CLI network settings | 1. Run switch command<br>2. Verify | `sui client active-env` returns devnet | CLI, **Sui Extension** | Get test tokens |
| L6 | Get Tokens via Faucet | Acquire test SUI | 1. Run faucet command<br>2. Check balance | `sui client gas` displays balance | CLI | Unit 1 Clear! Next: PTB Builder |

### Checkpoint

Success if `sui client active-env` returns `devnet` and `sui client gas` displays a balance.

### Pitfalls

- **CLI Connection Error**: Verify network settings (`sui client switch --env devnet`).
- **Faucet Limit**: Rate limits apply if requested multiple times quickly (wait a few minutes).
- **Sui Extension Not Showing**: Open a file with the `.move` extension to verify.

---

## Unit 2: Transactions & PTB Builder

**Deliverable**: Successfully executed a tx combining 2 operations in PTB Builder

### Lessons

| ID | Title | Goal | Do | Success Check | Tools | Next |
|:--|:--|:--|:--|:--|:--|:--|
| L7 | Connect Wallet to PTB Builder | Link PTB Builder and Slush | 1. Access PTB Builder<br>2. Connect Wallet<br>3. Approve in Slush | "Connected" status appears | **PTB Builder**, Slush | Check tx in Explorer |
| L8 | Read tx in Explorer | Understand transaction contents | 1. Open Explorer<br>2. Search for tx<br>3. Check details | Can read Input/Output/Gas | Explorer | Try sending via CLI |
| L9 | Try Transfer via CLI | Execute tx via command line | 1. Transfer via CLI<br>2. Verify result | Tx hash is obtained | CLI | Combine 2 operations |
| L10 | Combine 2 Operations | Group multiple actions into 1 tx | 1. Set Transfer + Transfer<br>2. Execute | 2 transfers succeed in 1 tx | **PTB Builder**, Slush | Convert to TS code |
| L11 | Verify PTB → TS Export | Experience code output from GUI | 1. Click Export button<br>2. Check TS code | TS code is displayed (reproduce in Unit 4) | **PTB Builder** | Unit 2 Clear! Next: Own contract |

### Checkpoint

Success if a tx combining 2 operations in PTB Builder is successful.

### Pitfalls

- **Wrong Recipient Address**: Test by sending to your own alternative address.
- **Insufficient Gas**: Obtain more via Faucet.
- **PTB Builder Connection Error**: Check wallet connection status.

---

## Unit 3: Publishing Move

**Deliverable**: Published your own contract and called it via Explorer

### Lessons

| ID | Title | Goal | Do | Success Check | Tools | Next |
|:--|:--|:--|:--|:--|:--|:--|
| L12 | Create Move Project | Create a new package | 1. sui move new<br>2. Verify folder structure | Move.toml is generated | CLI, **Sui Extension** | Understand Move mechanics |
| L13 | Understand Move Mechanics | Grasp Resource/Module/Package | 1. Read conceptual diagram<br>2. Check sample code | Can explain the 3 concepts | Reading | Let's write the contract |
| L14 | Write Minimal Contract | Implement struct + entry function | 1. Implement a counter<br>2. Verify syntax | No build errors | **Sui Extension** | Build and test |
| L15 | Build & Test | Verify locally | 1. sui move build<br>2. sui move test | Tests pass | CLI, **Sui Extension** | Deploy to Devnet |
| L16 | Publish to Devnet | Deploy the contract | 1. sui client publish<br>2. Obtain Package ID | Package ID found on Explorer | CLI, Explorer | Call from Explorer |
| L17 | Call Function from Explorer | Operate contract via GUI | 1. Search Package ID<br>2. Execute<br>3. Verify result | Function executes normally | Explorer, Slush | Unit 3 Clear! Next: TS operation |

### Checkpoint

Success if your own contract is published and called successfully from the Explorer.

### Pitfalls

- **Build Error**: Check the Sui Extension error display.
- **Publish Failure**: Check gas balance and code syntax.
- **Lost Package ID**: Can be searched via Explorer history.

---

## Unit 4: Building PTB with TS

**Deliverable**: Built a PTB in TS; succeeded in Signing -> Execution -> Result Verification

### Lessons

| ID | Title | Goal | Do | Success Check | Tools | Next |
|:--|:--|:--|:--|:--|:--|:--|
| L18 | Understand SDK Structure | Roles of @mysten/sui & @mysten/dapp-kit | 1. Check packages<br>2. Refer to docs | Can explain both roles | Reading | Connect with SuiClient |
| L19 | Connect with SuiClient | Network connection & data fetch | 1. Run getBalance<br>2. Verify result | Balance is retrieved | TS | Build PTB in TS |
| L20 | Use Transaction Class | Construct PTB with TS | 1. Recreate Unit 2 PTB in TS<br>2. Execute | Obtain same result | TS, **PTB Builder Ref** | Setup dapp-kit |
| L21 | Setup dapp-kit Provider | Build frontend foundation | 1. Set Provider hierarchy<br>2. Verify operation | Boots without errors | dapp-kit | Create wallet connection |
| L22 | Create Wallet Connect Button | Wallet linkage with ConnectButton | 1. Place ConnectButton<br>2. Test connection | Wallet is connected | dapp-kit, Slush | Sign & execute tx |
| L23 | Sign and Execute tx | Sign/send tx from frontend | 1. useSignAndExecuteTransaction<br>2. Call L16 contract | Tx is successful | dapp-kit, Slush | Display results in UI |
| L24 | Display Results in UI | Reflect tx result in UI | 1. Success/Fail logic<br>2. Display | Result appears on UI | dapp-kit | Unit 4 Clear! Next: Integration |

### Checkpoint

Success if the tx built in TS works through Wallet Signing -> Execution -> Result Display.

### Pitfalls

- **Provider Setup Error**: Check hierarchy (QueryClientProvider → SuiClientProvider → WalletProvider).
- **Type Error**: Check @mysten/sui version.
- **Wallet Not Connected**: Check the return value of useCurrentAccount.

---

## Unit 5: UI Completion with dapp-kit

**Deliverable**: Wallet connection and result display working on the UI

### Lessons

| ID | Title | Goal | Do | Success Check | Tools | Next |
|:--|:--|:--|:--|:--|:--|:--|
| L25 | Overall Project Design (Opt) | Organize Move + Frontend integration | 1. Check directory structure<br>2. Verify dependencies | Grasp the big picture | Reading | Move to integration |
| L26 | Integrate Contract & Frontend | Link L16 contract + L24 frontend | 1. Set Package ID<br>2. Test calling | Works locally | dapp-kit, **Sui Extension** | Finalize UI |
| L27 | Finalize UI | Refine User Experience | 1. Adjust styles<br>2. Error handling | UI is easy to use | dapp-kit | Unit 5 Clear! Next: Deploy |

### Checkpoint

Success if the UI works from wallet connection to result display.

### Pitfalls

- **Package ID Mismatch**: Manage Package ID via environment variables.
- **CORS Issue**: Check local development server settings.
- **State Update Latency**: Check refetch settings in useSuiClientQuery.

---

## Unit 6: Deployment & Next Steps

**Deliverable**: Published the dApp and completed the course

### Lessons

| ID | Title | Goal | Do | Success Check | Tools | Next |
|:--|:--|:--|:--|:--|:--|:--|
| L28 | Choose Hosting Method | Decide where to publish | 1. GitHub Pages (Fast/Rec)<br>2. Walrus Sites (Web3/Opt)<br>3. Select | Strategy decided | Reading | Let's deploy |
| L29 | Build and Deploy | Publish the frontend | 1. Build<br>2. Deploy<br>3. Verify URL | Accessible via public URL | site-builder or GitHub | Verify operation |
| L30 | Operation Verification | Test the live dApp | 1. Connect wallet<br>2. Execute tx<br>3. Verify result | All functions work | Live dApp, Slush | Reflection |
| L31 | Reflection | Organize learned content | 1. Check checklist<br>2. Verify achievements | All items cleared | Reading | To next steps |
| L32 | Next Steps | Guidance to Advanced Course | 1. Check Advanced Course<br>2. Choose field of interest | Next goal decided | Reading | Join the community |
| L33 | About Contributors | Learn credit policy & contribution | 1. Check Contributors<br>2. Check contribution guide | Understand how to contribute | Reading | See community resources |
| L34 | Community Resources | Japanese community & event info | 1. Check community links<br>2. Check event info | Know next learning resources | Reading | Beginner Course Complete! |

### Hosting Options

| Option | Features | Recommendation |
|:--|:--|:--|
| **GitHub Pages** | Free, easy setup, fast | Recommended (Start here) |
| **Walrus Sites** | Decentralized storage on Sui, Web3 native | If you have extra capacity |
| **Vercel / Netlify** | CI/CD integration, preview features | Alternative |

### Checkpoint

Success if the dApp operates at a Walrus Sites or GitHub Pages URL.

### Pitfalls

- **Build Failure**: Check environment variable settings.
- **404 Error**: Check SPA routing settings.
- **Wallet Connection Impossible**: Ensure hosting is via HTTPS.

---

## Advanced Course (Advanced Track)

High-level topics to challenge after completing the beginner course.

### Move Advanced Patterns

- **Ability Details** - Combination patterns of copy / drop / store / key
- **Generics** - Type parameters, phantom types
- **OTW / init function** - Package initialization, obtaining Publisher
- **Events** - `sui::event::emit`, off-chain tracking
- **Shared Object** - Consensus, cost characteristics
- **Dynamic Field** - Parent-child object relationships
- **Collections** - Table, Bag, ObjectTable, ObjectBag
- **Witness Pattern** - Type-level authentication
- **Hot Potato Pattern** - Forced consumption
- **Capability Pattern** - AdminCap, permission control
- **UpgradeCap** - Package upgrades
- **Kiosk / TransferPolicy** - NFT trading standards
- **BCS** - Binary Serialization
- **Enum / Match** - Move 2024 new features

### SDK Applications

- **Dry Run** - Transaction simulation
- **Event Queries** - `queryEvents`
- **Sponsored Tx** - Gasless UX
- **GraphQL API** - Flexible data querying
- **zkLogin** - Wallet generation via OAuth
- **Kiosk SDK** - NFT Marketplaces
- **BCS (SDK)** - Frontend ⇔ Contract linkage
- **Multisig** - Multi-signature wallets

### Sui Stack

- **Walrus** - Decentralized storage details
- **Seal** - Encryption
- **MVR** - Move Registry
- **DeepBook** - DEX
- **Nautilus** - Off-chain computation

---

## Appendix: Lesson Structure

Each Lesson consists of the following fields:

| Field | Description |
|:--|:--|
| ID | Lesson Number (L1–L34) |
| Title | Lesson Title |
| Goal | One-line goal |
| Do | To-do items (1–3 points) |
| Success Check | Success condition (One-line) |
| Tools | Tools used |
| Next | Reason to move forward |

### Tool List

| Tool | Description |
|:--|:--|
| **Sui Extension** | Move development extension for VSCode |
| **PTB Builder** | Tool for composing PTBs via GUI |
| Slush | Sui wallet extension (Browser, Signing/Connection) |
| CLI | Sui CLI (Command line tool) |
| Explorer | Sui Explorer (Transaction verification) |
| dapp-kit | @mysten/dapp-kit (SDK for React) |
| TS | TypeScript + @mysten/sui |