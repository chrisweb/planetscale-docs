---
title: Branching and deploy requests
subtitle: Explore how to utilize branching in PlanetScale, a key feature of the platform.
date: '2022-09-13'
---

{% vimeo src="https://player.vimeo.com/video/748936870" caption="Branching and deploy requests" /%}

## Overview

Now that you have an account and database set up, we can explore one of the key features of PlanetScale: branching.

{% callout %}
This guide continues from the [previous entry](/docs/onboarding/create-a-database) describing how to create a database. If you do not have a database created, follow the steps in that guide before proceeding
{% /callout %}

## What are branches?

Branches are copies of your database schema that live in a completely separate environment from each other. Making changes in one branch does not affect other branches until you merge them, just like you manage code branches in your projects.

There are currently two types of branches in PlanetScale:

- Production branches
- Non-production branches

### Production branches

Production branches should be used for the production version of your application. There are certain measures in place on production branches to protect your production data:

- Direct DDL is not permitted. You can only apply schema changes using Deploy requests (covered later in this guide).
- Console access is disabled by default.
- Production branches include at least one read-only replica internally to automatically protect your database against outages.

{% callout %}
Data definition language (DDL) is the syntax for modifying the structure of a database. This includes commands that add, remove, or alter tables, columns, views, etc.
{% /callout %}

### Non-production branches

Your database can have one or more non-production branches, depending on your plan. Non-production branches are used for making changes or experimenting with your database structure. These branches do not have the same protective restrictions or resiliency as production branches.

### Deploy requests

Deploy requests are how changes from one database branch are applied to another. They are similar to pull requests in your code repositories, but for databases. When a new Deploy request is created, you can view the changes, comment on them, and collaborate with your team just like you would a PR.

## Typical branching strategy

![The PlanetScale workflow.](/img/planetscale-workflow.png)

Most applications have at least two environments, a production environment where active users work with the application, and a development environment where developers extend the application and test changes. PlanetScale is built with this in mind, which is why branching is such a fundamental feature.

A typical strategy with branching would go something like this:

- The PlanetScale database has two branches: `main` and `dev`.
- A developer decides to extend a form in the application and needs to add a new field. They create a branch in the code to manage their changes.
- Because this is a new data field, a new column must be added to the corresponding table in PlanetScale. The developer adds this column to the `dev` branch of the PlanetScale database.
- After the new field has been added to the code, the developer creates a pull request to merge the code branches, and a **Deploy request** in PlanetScale to merge the database changes.
- The PlanetScale deploy request is merged first to ensure that the column exists in the database before the application code starts writing to it. Once live, the application code pull request is merged in. With this branching workflow, the schema changes are safely applied to the `main` branch of the database without any table locking occurring and zero downtime to the users of the application.

## Branching in action

Now that you understand why branches are such an important feature in PlanetScale, let’s see how to use them.
We're going to promote our existing branch to production, create a new development branch, add a new column, create a deploy request, and deploy it to production.

### Promote dev branch to production

Start by navigating to the `travel_db` database, click the **"Branches"** tab, and select the `main` branch. Click the button that says **"Promote a branch to production"** to flag the default `main` branch as a production branch.

![The Overview tab of the database.](/docs/onboarding/branching-and-deploy-requests/the-overview-tab-of-the-database.png)

In the modal that appears, `main` should be selected. Click **"Promote branch"**.

![The Promote branch modal.](/docs/onboarding/branching-and-deploy-requests/the-promote-branch-modal.png)

### Create a dev branch

Back in the database **"Overview"** tab, click the **"New branch"** button to create a new branch.

![The Overview tab of the database with the New branch button highlighted.](/docs/onboarding/branching-and-deploy-requests/the-overview-tab-of-the-database-with-the-new-branch-button-highlighted.png)

In the **New branch** modal, you’ll see options to name the branch, select the base, and even change the region for this branch. Name the branch `dev` and click **"Create branch"**.

![The New branch modal.](/docs/onboarding/branching-and-deploy-requests/the-new-branch-modal.png)

The branch takes a few minutes to initialize. Wait for this process to complete before proceeding.

![The view of the branch being initialized.](/docs/onboarding/branching-and-deploy-requests/the-view-of-the-branch-being-initialized.png)

Once the branch is ready to go, the page will automatically update to allow you to create deploy requests directly from the **"Overview"** tab.

![The view of the branch after its been initialized.](/docs/onboarding/branching-and-deploy-requests/the-view-of-the-branch-after-its-been-initialized.png)

### Make a schema change

Now that the branch is initialized, let’s update the schema of our `hotels` table and add a `description` column. Click the **"Console"** tab and run the following script.

```sql
ALTER TABLE hotels ADD description VARCHAR(500);
```

![The console with the output of the ALTER command.](/docs/onboarding/branching-and-deploy-requests/the-console-with-the-output-of-the-alter-command.png)

Now run the following command to see the structure of the table in the `dev` branch. You’ll see the new `description` column in the table structure.

```sql
DESCRIBE hotels;
```

![The console with the output of the DESCRIBE command.](/docs/onboarding/branching-and-deploy-requests/the-console-with-the-output-of-the-describe-comamnd.png)

Before we merge these changes, let's double-check the `main` branch of the database and compare the structure of the same table. To quickly switch branches, click the branch name in the header and select **"main"** from the list.

![How to quickly access different branches.](/docs/onboarding/branching-and-deploy-requests/how-to-quickly-access-different-branches.png)

Since `main` is a production branch, if you click on **"Console"**, you’ll get a notice that it is disabled on production branches.

![The disabled Console tab.](/docs/onboarding/branching-and-deploy-requests/the-disabled-console-tab.png)

In a working environment, you’d want it to stay like this since it protects the data in that branch. For the sake of the guide though, we can turn this protection off so we can check the structure of the table. Click on the database name in the header and click the **"Settings"** tab to access the general database settings. Check the box that says **"Allow web console access to production branches"**, then click **"Save database settings"**.

![The settings view of where to allow console access for production branches.](/docs/onboarding/branching-and-deploy-requests/the-settings-view-of-where-to-allow-console-access-for-production-branches.png)

To access the `main` branch again, click the **"Branches"** tab, then the **"main"** branch from the list.

![The branches tab.](/docs/onboarding/branching-and-deploy-requests/the-branches-tab.png)

Click the **"Console"** tab and it should be available now. Run the following command to see the structure of the `hotels` table.

```sql
DESCRIBE hotels;
```

![The console of the main branch with the output of the DESCRIBE command.](/docs/onboarding/branching-and-deploy-requests/the-console-of-the-main-branch-with-the-output-of-the-describe-command.png)

Notice how `description` is missing. This is because we made the change on the `dev` branch and haven’t merged the changes into `main`. Let’s fix that now. Click the branch name in the header and access the **"dev"** branch.

![The branch quick access menu.](/docs/onboarding/branching-and-deploy-requests/the-branch-quick-access-menu.png)

### Create a deploy request

On the **"Overview"** tab, you can now create a deploy request. Enter a comment (optional), then click "Create deploy request".

![The Overview tab of the dev branch.](/docs/onboarding/branching-and-deploy-requests/the-overview-tab-of-the-dev-branch.png)

PlanetScale will automatically check to see if your changes can be deployed by comparing the schemas between the `dev` and `main` branches.

![The deploy request view while changes are being evaluated.](/docs/onboarding/branching-and-deploy-requests/the-deploy-request-view-while-changes-are-being-evaluated.png)

Once that process is completed, you’ll get the option to deploy the changes or close the deploy request. Unlike pull requests, you can only have one active deploy request on a branch at any given time. If you needed to create another deploy request, you’d have to close the previous one out.

There is also the option to auto-apply your changes after PlanetScale has finished staging them. This option is selected by default. If it is disabled, PlanetScale will stage your changes and wait for you to manually apply them before making them live, which can be helpful under certain circumstances.

![The deploy request view after changes have been evaluated and can be deployed.](/docs/onboarding/branching-and-deploy-requests/the-deploy-request-view-after-changes-have-been-evaluated-and-can-be-deployed.png)

You also have the option to view the schema changes by clicking the **"View schema changes button"** or clicking the **"Schema changes"** tab. This will show a diff between the schemas so you can see what changes will be applied.

![The Schema changes tab with the diff between branches.](/docs/onboarding/branching-and-deploy-requests/the-schema-changes-tab-with-the-diff-between-branches.png)

Once you are done exploring, click the **"Deploy changes"** button on the summary tab.

![The Summary tab of the deploy request.](/docs/onboarding/branching-and-deploy-requests/the-summary-tab-of-the-deploy-request.png)

Once the changes are deployed, the status of the deployment will be displayed, along with how long the deployment took and who initiated it.

![The deploy request view after changes have been deployed.](/docs/onboarding/branching-and-deploy-requests/the-deploy-request-view-after-changes-have-been-deployed.png)

Head back to the console of the `main` branch and run the `DESCRIBE` command again. Notice how the `main` branch now has the `description` column that was added to `dev` earlier in the guide.

```sql
DESCRIBE hotels;
```

![The console of the main branch after changes have been deployed.](/docs/onboarding/branching-and-deploy-requests/the-console-of-the-main-branch-after-changes-have-been-deployed.png)

{% callout title="Next steps" %}
You should have a good understanding of the core concepts of PlanetScale at this point. In the next guide, we’ll cover how you can connect to your PlanetScale database using the language or client of your choice.

- [Connect to your database](/docs/onboarding/connect-to-your-database)

{% /callout %}
