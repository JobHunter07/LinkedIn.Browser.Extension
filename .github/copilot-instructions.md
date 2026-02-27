# Copilot Instructions

## After Every Code Change

After completing any code changes in this workspace, **always** run the Firefox build command:

```
npm run build:firefox
```

- If the build produces **any errors**, fix them and re-run the build.
- Keep fixing and rebuilding until the build completes with **0 errors**.
- Only consider the task done once the build succeeds cleanly.
