# Test-Driven Development (TDD) Approach

This project was built using Test-Driven Development. Every feature was built by:
1. Writing tests FIRST
2. Running tests (they fail - RED)
3. Writing minimal code to pass (GREEN)
4. Refactoring if needed (REFACTOR)

## Test Coverage

### Unit Tests

**lib/noteReader.ts**
- `readNotesFromDirectory()` - Reads markdown files from directory
  - ✅ Returns empty array when directory doesn't exist
  - ✅ Returns empty array when no markdown files
  - ✅ Returns array of markdown file paths
  
- `parseNote()` - Parses individual markdown file
  - ✅ Parses frontmatter and content
  - ✅ Uses filename as title when no title in frontmatter
  - ✅ Handles markdown without frontmatter
  - ✅ Trims whitespace from content

**lib/notes.ts**
- `getAllNotes()` - Gets all notes from vault
  - ✅ Returns empty array when no files
  - ✅ Parses all markdown files
  - ✅ Handles single note

### Component Tests

**app/components/NoteCard.tsx**
- ✅ Renders note title
- ✅ Renders note content
- ✅ Truncates long content at 200 characters
- ✅ Doesn't truncate short content
- ✅ Renders properties as badges
- ✅ Renders array properties as comma-separated
- ✅ Hides properties section when empty
- ✅ Doesn't duplicate title property
- ✅ Handles empty content

### Integration Tests

**app/page.tsx**
- ✅ Renders page title
- ✅ Shows empty state when no notes
- ✅ Displays notes when they exist
- ✅ Hides empty state when notes exist
- ✅ Displays multiple notes in order
- ✅ Calls getAllNotes with vault path

## Running Tests

### Development (watch mode)
```bash
npm test
```

### CI mode (runs once)
```bash
npm run test:ci
```

### Build (runs tests first)
```bash
npm run build
```

## Build Pipeline

The build process REQUIRES all tests to pass:

1. **npm run build** triggers:
   - `npm run test:ci` (all tests must pass)
   - `next build` (only runs if tests pass)

2. **Netlify deployment**:
   - Automatically runs `npm run build`
   - Deploy fails if any test fails
   - Deploy succeeds only with passing tests

## Adding New Features

Follow TDD for new features:

1. **Write the test first** in `__tests__` directory
2. **Run tests** - should fail (RED)
3. **Write minimal code** to pass the test (GREEN)
4. **Refactor** if needed while keeping tests green
5. **Commit** when all tests pass

## Test Structure

```
project/
├── lib/
│   ├── __tests__/
│   │   ├── noteReader.test.ts
│   │   └── notes.test.ts
│   ├── noteReader.ts
│   └── notes.ts
├── app/
│   ├── __tests__/
│   │   └── page.test.tsx
│   ├── components/
│   │   ├── __tests__/
│   │   │   └── NoteCard.test.tsx
│   │   └── NoteCard.tsx
│   └── page.tsx
└── jest.config.js
```

## Benefits of This Approach

✅ **Confidence**: Every feature is tested before deployment
✅ **Documentation**: Tests serve as living documentation
✅ **Safety**: Changes can't break existing features silently
✅ **Quality**: Forces thinking about edge cases upfront
✅ **Autonomous**: Build fails automatically if tests fail


