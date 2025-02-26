---
title: 'PlanetScale CLI commands - region'
subtitle: 'Use the PlanetScale CLI to create development branches, open deploy requests, and make non-blocking schema changes directly from your terminal.'
date: '2022-08-23'
meta:
  title: 'CLI reference - region'
---

## Getting Started

Make sure to first [set up your PlanetScale developer environment](/docs/concepts/planetscale-environment-setup). Once you've installed the `pscale` CLI, you can interact with PlanetScale and manage your databases straight from the command line.

## The `region` command

This command lists all available [PlanetScale regions](/docs/concepts/regions).

**Usage:**

```bash
pscale region <SUB-COMMAND> <FLAG>
```

### Available sub-commands

| **Sub-command** | **Description**  |
| --------------- | ---------------- |
| `list`          | List all regions |

### Available flags

| **Flag**       | **Description**                |
| -------------- | ------------------------------ |
| `-h`, `--help` | View help for `region` command |

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

### The `region` command with `list` sub-command

**Command:**

```bash
pscale region list
```

**Output:**

```bash
  NAME (9)                            SLUG                 ENABLED
 ----------------------------------- -------------------- ---------
  AWS us-east-1 (Northern Virginia)   us-east              Yes
  AWS us-west-2 (Oregon)              us-west              Yes
  AWS eu-west-1 (Dublin)              eu-west              Yes
  AWS ap-south-1 (Mumbai)             ap-south             Yes
  AWS ap-southeast-1 (Singapore)      ap-southeast         Yes
  AWS ap-northeast-1 (Tokyo)          ap-northeast         Yes
  AWS eu-central-1 (Frankfurt)        eu-central           Yes
  AWS ap-southeast-2 (Sydney)         aws-ap-southeast-2   Yes
  AWS sa-east-1 (Sao Paulo)           aws-sa-east-1        Yes
  AWS eu-west-2 (London)              aws-eu-west-2        Yes
```
