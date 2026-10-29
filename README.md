# Ndjangui — Tontine Off-chain

**Cardano-based off-chain component for the Ndjangui digital tontine platform**

[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)](https://www.typescriptlang.org/)
[![Blockchain](https://img.shields.io/badge/Blockchain-Cardano-0033AD)](https://cardano.org/)
[![Smart Contracts](https://img.shields.io/badge/Integration-Lucid-6C5CE7)](https://lucid.spacebudz.io/)

## 1. Overview

Ndjangui is a digital platform concept designed to support community savings and rotating savings groups (tontines). Its objective is to improve transparency, traceability, and accessibility in savings activities.

This repository contains the **off-chain component** of the Ndjangui tontine implementation. It provides the application-side logic used to interact with Cardano smart contracts and perform tontine-related operations.

The broader Ndjangui project specification also describes daily savings collection, digital FCFA, collector commissions, identity management, peer-to-peer transfers, and lending. These broader capabilities are part of the platform vision and should not be assumed to be implemented in this repository.

## 2. Project objectives

The off-chain component aims to support the application workflows required to interact with a blockchain-based tontine, including:

- Initializing a tontine.
- Opening and closing a tontine.
- Processing member contributions.
- Initiating beneficiary payouts.
- Interacting with Cardano through the Lucid library.
- Handling transaction construction and submission from the application side.

The implementation should preserve the rules defined by the associated smart contracts. Off-chain validation must not be treated as a replacement for on-chain validation.

## 3. Technology stack

The repository uses or is structured around the following technologies:

| Technology | Purpose |
|---|---|
| TypeScript | Application-side implementation |
| Cardano | Blockchain network |
| Lucid | Cardano transaction and wallet interaction |
| Node.js | JavaScript runtime for the off-chain application |

Check the repository's package manifest for the exact dependency versions and supported runtime requirements.

## 4. Repository structure

The following files are relevant starting points when exploring the current implementation. Confirm their exact responsibilities in the source before modifying them.

| File | Purpose |
|---|---|
| `TontineApp.ts` | Main tontine operations and off-chain workflow |
| `TontineAppCode.ts` | Related tontine application or contract interaction code |
| `wallet.ts` | Wallet-related functionality |
| `RegisterPPP.ts` | Registration or related application functionality |
| `seed.ts`, `myseed.ts` | Seed-related code; handle carefully and never commit real secret material |
| `basic.ts`, `basic.js` | Supporting or example code |

The repository may evolve. This table is an orientation guide, not a guarantee that every file is part of the production execution path.

## 5. Main tontine operations

The existing implementation includes operations associated with the tontine lifecycle and financial workflow.

| Operation | Description |
|---|---|
| Initialize tontine | Starts the initialization process for a tontine |
| Open tontine | Initiates the opening operation |
| Close tontine | Initiates the closing operation |
| Contribute | Processes a member contribution |
| Pay beneficiary | Initiates the payout to a beneficiary address |

The corresponding functions identified in the existing implementation include:

- `initilizeTontine()`
- `openTontine()`
- `closeTontine()`
- `tontiner(amount)`
- `payer(beneficiaryAddress)`

Function names and signatures should be checked against the current source. In particular, retain existing public interfaces unless a justified change is required.

## 6. Conceptual workflow

A rotating savings group generally follows a recurring contribution and distribution process:

1. A tontine is initialized.
2. The tontine is configured according to its applicable rules.
3. Members participate and make their contributions.
4. The beneficiary for the relevant cycle is determined according to the agreed rules.
5. The beneficiary initiates the payout.
6. The process continues according to the tontine's schedule and contract rules.

The exact lifecycle, eligibility conditions, beneficiary selection rules, and transaction requirements must be derived from the deployed smart contract and the current implementation. This README does not introduce new contract rules.

## 7. Prerequisites

Before running the project, ensure that your development environment has:

- Node.js installed at a version compatible with the project dependencies.
- npm or the package manager specified by the repository.
- Git.
- Access to the Cardano network required by your development environment.
- The wallet and network configuration required by the application.

Consult `package.json` and the existing source code to confirm the exact runtime and setup requirements.

## 8. Getting started

### Clone the repository

```bash
git clone https://github.com/angedid/Tontine-off-chain.git
cd Tontine-off-chain
```

### Install dependencies

```bash
npm install
```

### Configure the environment

Review the wallet and network initialization code before running the application.

Use environment variables or the configuration mechanism adopted by the project for environment-specific values. Do not commit:

- Private keys.
- Wallet seed phrases.
- API tokens.
- Production credentials.
- Personal or financial data.

If an example environment file is provided, copy it to the appropriate local configuration file and fill it with test-only values. Never use real wallet secrets in test fixtures or example configuration.

### Run the application

The exact start and build commands depend on the scripts defined in `package.json`.

Inspect the available scripts before execution:

```bash
npm run
```

Use only commands that are actually defined by the repository.

## 9. Testing and validation

Tests should cover the off-chain business logic as well as the interaction boundaries with Cardano.

Recommended areas include:

### Unit tests

- Tontine lifecycle validation.
- Contribution amount validation.
- Beneficiary address validation.
- Invalid state handling.
- Error-handling behaviour.

### Integration tests

- Transaction construction using the appropriate test setup.
- Wallet and network configuration.
- Interaction with the relevant Cardano test network, where available.

### Failure scenarios

- Invalid inputs.
- Missing configuration.
- Network connection failures.
- Transaction submission failures.
- Confirmation timeouts.

Tests that use mocks should be clearly distinguished from tests that interact with a real Cardano test network.

Document the exact commands used to run the tests once the test framework and scripts have been verified.

## 10. Security considerations

Blockchain applications require careful handling of wallet credentials and transaction data.

Development guidelines:

- Never commit private keys or seed phrases.
- Never expose sensitive wallet information in logs or error messages.
- Validate addresses and user inputs before transaction construction.
- Validate transaction preconditions against the actual contract rules.
- Do not report a transaction as successful merely because it was constructed or submitted.
- Distinguish transaction construction, submission, and confirmation.
- Use test wallets and test networks for development.
- Keep dependencies and configuration under review.

The broader Ndjangui specification also identifies secure communication, protection of sensitive user data, access control, and security testing as platform requirements.

## 11. Development guidelines

Contributions should follow these principles:

1. Understand the existing implementation before changing it.
2. Keep changes focused on the task being addressed.
3. Preserve existing business rules and public interfaces where possible.
4. Avoid introducing unnecessary dependencies.
5. Add tests for new behaviour and important edge cases.
6. Document configuration and behaviour changes.
7. Report test results accurately.
8. Never include secrets or real financial data in commits.

## 12. Scope and future improvements

Potential improvements to the off-chain component include:

- More explicit tontine lifecycle validation.
- Stronger contribution amount validation.
- Safer beneficiary payout checks.
- Centralized wallet and network configuration.
- Improved transaction error handling.
- Automated unit and integration tests.
- More complete developer documentation.

These items are improvement opportunities, not a claim that the functionality is already implemented.

The wider Ndjangui platform specification also identifies additional modules such as identity and access management, digital accounts, FCFA conversion, money issuance, peer-to-peer transfers, loans and credit, collector commissions, service pricing, and notifications. These should be treated as separate platform-level work unless they are explicitly included in this repository's scope.

## 13. Reference documentation

- **Source repository:** https://github.com/angedid/Tontine-off-chain
- **Cardano:** https://cardano.org/
- **Lucid documentation:** https://lucid.spacebudz.io/
- **TypeScript documentation:** https://www.typescriptlang.org/docs/

## 14. Disclaimer

This repository is an off-chain software component associated with the Ndjangui tontine project. Its presence does not imply that the complete Ndjangui platform, all financial services, or all production security controls are implemented.

Always verify contract behaviour, network configuration, transaction status, and test results against the actual project source and target environment before using the software with real funds.
