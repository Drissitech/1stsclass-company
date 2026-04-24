# Security Specification: 1st Class International Trade

## 1. Data Invariants
- **Public Read Access**: `settings`, `articles` (published), `services`, `products`, `pages`, `sections` are readable by anyone.
- **Admin-Only Write Access**: Only the owner (`techbydrissi@gmail.com`) can create, update, or delete content.
- **Client Integrity**: Every write must strictly match the schema defined in `firebase-blueprint.json`. NO ghost fields allowed.
- **Messages**: Anyone can `create` a message, but only an admin can `list` or `delete` them.

## 2. The "Dirty Dozen" Payloads (Red Team Test Cases)
1. **Ghost Field Injection**: Adding `isVerified: true` to a service.
2. **Identity Spoofing**: Trying to write to `settings/global` as a guest.
3. **Email Spoofing**: Authenticating as `admin@fake.com` and trying to delete an article.
4. **State Shortcutting**: Updating an article status from `draft` to `featured` (where `featured` isn't an enum).
5. **PII Leak**: Guest trying to `list` the `/messages` collection.
6. **Immutable Field Attack**: Trying to change the `createdAt` timestamp of a page.
7. **Size Limit Abuse**: Sending a 2MB string as an article title.
8. **Relational Sync Break**: Deleting a service but leaving orphaned products pointing to it (if relational).
9. **Action Leak**: Changing a price and a name in the same update when only price is allowed for that user role.
10. **ID Poisoning**: Creating a message with ID `../settings/global` to overwrite settings.
11. **Type Poisoning**: Sending `order: "one"` (string) instead of `1` (number).
12. **Blind Update**: Updating a document without sending all required fields (for `create`).

## 3. Implementation Plan
- **Master Gate**: `isOwner()` helper based on verified email.
- **Validation Blueprints**: `isValidArticle()`, `isValidProduct()`, etc.
- **Action Partitioning**: Separate logic for "Publish" vs "Content Update".
