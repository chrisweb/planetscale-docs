---
title: 'Security log'
subtitle: 'The security log tracks authentication and security-related actions conducted in your PlanetScale account.'
date: '2022-08-01'
---

## Overview

The Security log gives you insight into recent authentication and other security-related `actions` for your account. Your security log also details when you performed each `action`.

Security log events are retained for 15 days in your PlanetScale account.

## Review your security log

You can review your security log in your PlanetScale account settings.

1. Go to your [PlanetScale Security log](https://app.planetscale.com/settings/security-log) page.

Once there, you can filter your Security log by `Action`.

![Filter your security log by Action.](/docs/concepts/security-log/filter.png)

## Security log events

You can track the following `events` in your PlanetScale account:

{% table %}

- PlanetScale security log events
- Actions

---

- user
- signed_out

  signed_in

  accepted_tos

  updated_name

  updated_email

  enabled_mfa

  disabled_mfa

{% /table %}

{% callout title="Next steps" %}

- [Audit log](/docs/concepts/audit-log)

{% /callout %}
