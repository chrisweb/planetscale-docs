---
title: 'PlanetScale CLI commands - password'
subtitle: 'Use the PlanetScale CLI to create development branches, open deploy requests, and make non-blocking schema changes directly from your terminal.'
date: '2022-08-01'
meta:
  title: 'CLI reference - password'
---

## Getting Started

Make sure to first [set up your PlanetScale developer environment](/docs/concepts/planetscale-environment-setup). Once you've installed the `pscale` CLI, you can interact with PlanetScale and manage your databases straight from the command line.

## The `password` command

This command allows you to create, list, and delete branch passwords/credentials.

**Usage:**

```bash
pscale password <SUB-COMMAND> <FLAG>
```

### Available sub-commands

| **Sub-command**                                        | **Sub-command flags** | **Description**                                  |
| ------------------------------------------------------ | --------------------- | ------------------------------------------------ |
| `create <DATABASE_NAME> <BRANCH_NAME> <PASSWORD_NAME>` |                       | Create new credentials to access a branch's data |
| `delete <DATABASE_NAME> <BRANCH_NAME> <PASSWORD_ID>`   | `--force`             | Delete the specified branch credentials          |
| `list <DATABASE_NAME> <BRANCH_NAME>`                   | `--web`               | List all credentials of a database               |

The value `<PASSWORD_ID>` represents the ID number of the set of credentials. To find all available credentials and their IDs, run `pscale list <DATABASE_NAME> <BRANCH_NAME>`.

#### Sub-command flag descriptions

Some of the sub-commands have additional flags unique to the sub-command. This section covers what each of those does. See the above table for which context.

| **Sub-command flag** | **Description**                                           | **Applicable sub-commands** |
| -------------------- | --------------------------------------------------------- | --------------------------- |
| `--role <ROLE>`      | Add a [role to a password](/docs/concepts/password-roles) | `create`                    |
| `--force`            | Delete a password without confirmation.                   | `delete`                    |
| `--web`              | Perform the action in your web browser                    | `list`                      |

Available roles for the `--role` flag are:

- `reader`
- `writer`
- `readwriter`
- `admin`

### Available flags

| **Flag**                    | **Description**                       |
| --------------------------- | ------------------------------------- |
| `-h`, `--help`              | View help for `password` command      |
| `--org <ORGANIZATION_NAME>` | The organization for the current user |

### Global flags

| **Command**                     | **Description**                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| `--api-token <TOKEN>`           | The API token to use for authenticating against the PlanetScale API.                 |
| `--api-url <URL>`               | The base URL for the PlanetScale API. Default is `https://api.planetscale.com/`.     |
| `--config <CONFIG_FILE>`        | Config file. Default is `$HOME/.config/planetscale/pscale.yml`.                      |
| `--debug`                       | Enable debug mode.                                                                   |
| `-f`, `--format <FORMAT>`       | Show output in a specific format. Possible values: `human` (default), `json`, `csv`. |
| `--no-color`                    | Disable color output.                                                                |
| `--service-token <TOKEN>`       | The service token for authenticating.                                                |
| `--service-token-id <TOKEN_ID>` | The service token ID for authenticating.                                             |

## Examples

### The `password` command with `delete` sub-command

**Command:**

```bash
pscale password delete <DATABASE_NAME> <BRANCH_NAME> <PASSWORD_ID>
```

**Output:**

```bash
? Please type <DATABASE_NAME>/<BRANCH_NAME>/<PASSWORD_ID> to confirm:
Password <PASSWORD_ID> was successfully deleted from <BRANCH_NAME>.
```
