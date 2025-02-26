---
title: 'PlanetScale CLI'
subtitle: 'Use the PlanetScale CLI to create development branches, open deploy requests, and make non-blocking schema changes directly from your terminal.'
date: '2022-08-01'
---

## Getting Started

Make sure to first [set up your PlanetScale developer environment](/docs/concepts/planetscale-environment-setup). Once you've installed the `pscale` CLI, you can interact with PlanetScale and manage your databases straight from the command line.

![PlanetScale CLI](/docs/reference/planetscale-cli/cli.png)

Ready to take these commands for a run on the terminal?

## Available Commands

Use `pscale [command] [command]` to start up the `pscale` CLI in your terminal.

| **Command**                                        | **Subcommands/Options**                                                                                                                                                                | **Flags**                                                                                                                                                                        | **Description**                                                                                                                                              |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`audit-log`](/docs/reference/audit-log)           | `list`                                                                                                                                                                                 | `--help`, `--org string`                                                                                                                                                         | List all [audit logs](/docs/concepts/audit-log#review-your-organization-audit-log)                                                                           |
| [`auth`](/docs/reference/auth)                     | `login`, `logout`                                                                                                                                                                      | `--help`                                                                                                                                                                         | Authenticate via console                                                                                                                                     |
| [`backup`](/docs/reference/backup)                 | `create`, `delete`, `list`, `restore`, `show`                                                                                                                                          | `--help`, `--org string`                                                                                                                                                         | Manage [branch backups](/docs/concepts/back-up-and-restore)                                                                                                  |
| [`branch`](/docs/reference/branch)                 | `create`, `delete`, `diff`, `keyspaces`, `list`, `promote`, `refresh-schema`, `schema`, `show`, `switch`, `vschema`                                                                    | `--help`, `--org string`                                                                                                                                                         | Manage [branches](/docs/concepts/branching)                                                                                                                  |
| [`completion`](/docs/reference/completion)         | `bash`, `zsh`, `fish`, `powershell`                                                                                                                                                    | `--help`                                                                                                                                                                         | Generate completion script for specified shell                                                                                                               |
| [`connect`](/docs/reference/connect)               | `<database_name>` `<branch_name>`                                                                                                                                                      | `--execute string`, `--execute-env-url string`, `--execute-protocol string`, `--help`, `--host string`, `--org string`, `--port string`, `--remote-addr string`, `--role string` | Create a [secure connection](/docs/tutorials/connect-any-application#option-2-connect-using-the-planetscale-proxy) to the given database and branch          |
| [`database`](/docs/reference/database)             | `create`, `delete`, `dump`, `list`, `restore-dump`, `show`                                                                                                                             | `--help`                                                                                                                                                                         | Manage databases                                                                                                                                             |
| [`deploy-request`](/docs/reference/deploy-request) | `apply`, `cancel`, `close`, `create`, `deploy`, `diff`, `edit`, `list`, `revert`, `review`, `show`, `skip-revert`                                                                      | `--help`                                                                                                                                                                         | Manage [deploy requests](/docs/concepts/branching#1-create-a-deploy-request) including [gated deployments](/docs/concepts/deploy-requests#gated-deployments) |
| `help`                                             | `audit-log`, `auth`, `backup`, `branch`, `completion`, `connect`, `data-import`, `database`, `deploy-request`, `help`, `org`, `password`, `region`, `service-token`, `shell`, `signup` | `--help`                                                                                                                                                                         | View help for any command                                                                                                                                    |
| [`org`](/docs/reference/org)                       | `list`, `show`, `switch`                                                                                                                                                               | `--help`                                                                                                                                                                         | Manage and switch [organizations](/docs/concepts/access-control)                                                                                             |
| [`password`](/docs/reference/password)             | `create`, `delete`, `list`                                                                                                                                                             | `--help`, `--org string`                                                                                                                                                         | Manage [branch credentials](/docs/concepts/connection-strings)                                                                                               |
| [`region`](/docs/reference/region)                 | `list`                                                                                                                                                                                 | `--org string`                                                                                                                                                                   | View available [regions](/docs/concepts/regions)                                                                                                             |
| [`service-token`](/docs/reference/service-token)   | `add-access`, `create`, `delete`, `delete-access`, `list`, `show-access`                                                                                                               | `--help`, `--org string`                                                                                                                                                         | Manage access of [service tokens](/docs/concepts/service-tokens)                                                                                             |
| [`shell`](/docs/reference/shell)                   | `<database_name>` `<branch_name>`                                                                                                                                                      | `--help`, `--local-addr string`, `--org string`, `--remote-addr string`                                                                                                          | Open a MySQL shell instance to the specified database and branch                                                                                             |
| [`signup`](/docs/reference/signup)                 |                                                                                                                                                                                        | `--help`                                                                                                                                                                         | Sign up for a new PlanetScale account                                                                                                                        |

## Flags

You may use the following flags with the PlanetScale CLI commands.

| **Flag**                    | **Description**                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------- |
| `--api-token string`        | The API token to use for authenticating against the PlanetScale API                      |
| `--api-url string`          | The base URL for the PlanetScale API. (default "https://api.planetscale.com/")           |
| `--config string`           | Config file _(default: $HOME/.config/planetscale/pscale.yml)_                            |
| `--debug`                   | Enable debug mode                                                                        |
| `-f, --format string`       | Show output in specific format. Possible values: _[human, json, csv] (default: "human")_ |
| `-h, --help`                | Get more information about a command                                                     |
| `--no-color`                | Disable color output                                                                     |
| `--service-token string`    | Service Token for authenticating                                                         |
| `--service-token-id string` | The Service Token ID for authenticating                                                  |
| `--version`                 | Show pscale version                                                                      |

## Service tokens in organizations

To add **service tokens** for your organization, here's a complete list of access permissions that can be granted to a token:

{% table %}

- **Token Access Permissions**
- **What they control**

---

- `read_branch`

  `delete_branch`

  `create_branch`

- CRUD on _Branches_ of a `Database`

---

- `connect_branch`
- Connect to **development** _Branches_ of a `Database`

---

- `connect_production_branch`
- Connect to **production** _Branches_ of a `Database`

---

- `read_deploy_request`

  `create_deploy_request`

  `approve_deploy_request`

- _Deploy Requests_ on _Branches_ of a `Database`

---

- `read_comment`

  `create_comment`

- Comments of _Deploy Requests_ on _Branches_ of a `Database`

{% /table %}
