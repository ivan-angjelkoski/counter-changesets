# Agent Guidelines

This document contains guidelines and instructions for AI coding agents working on this repository.

## Changeset Requirements

**IMPORTANT**: When implementing any new feature, bug fix, or breaking change, you MUST create a changeset.

### What is a Changeset?

A changeset is a markdown file in the `.changeset/` directory that describes what changes were made and how they should affect the package version.

### When to Create a Changeset

Always create a changeset when:
- Adding a new feature (use `minor` version bump)
- Fixing a bug (use `patch` version bump)
- Making breaking changes (use `major` version bump)
- Updating dependencies in a way that affects consumers (use `patch` or `minor`)

### How to Create a Changeset

1. Create a new markdown file in `.changeset/` with a descriptive kebab-case name (e.g., `.changeset/add-reset-method.md`)

2. Use the following format:

```markdown
---
"package-name": minor
---

Description of the changes made.
```

3. The frontmatter (between `---`) must contain:
   - Package name in quotes
   - Version bump type: `major`, `minor`, or `patch`

4. Below the frontmatter, provide a clear description of the changes

### Version Bump Guidelines

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| Breaking changes | `major` | Removing or renaming public APIs |
| New features | `minor` | Adding new methods or options |
| Bug fixes | `patch` | Fixing incorrect behavior |
| Documentation | `patch` | Updating or adding docs |
| Performance | `patch` | Improving performance without API changes |

### Example Changeset

```markdown
---
"@ivan-angelkoski/counter": minor
---

Added `reset()` method to allow resetting the counter to its initial value or a specific value.
```

## Repository Structure

This is a Turborepo monorepo with the following structure:

- `apps/` - Application packages (web, docs)
- `packages/` - Shared packages (counter, ui, eslint-config, typescript-config)
- `.changeset/` - Changeset files for versioning

## Development Workflow

1. Make changes to the relevant package(s)
2. Write or update tests as needed
3. Run tests with `pnpm test`
4. Run linting with `pnpm lint`
5. **Create a changeset** for your changes
6. Commit all changes including the changeset
7. Push to your feature branch

## Commands Reference

- `pnpm install` - Install dependencies
- `pnpm build` - Build all packages
- `pnpm test` - Run tests for all packages
- `pnpm lint` - Lint all packages
- `pnpm --filter <package-name> test` - Run tests for a specific package
