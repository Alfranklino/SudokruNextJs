# Git Workflow & Guidelines

This document defines the Git usage rules for all projects.  
It ensures consistency, safety, and professional version control practices.

---

## Remote Repository Setup

1. **Repository Link**  
   - Use the GitHub repository link provided at project setup.

2. **Initial Commit**  
   - Must include a professional-level `README.md` file.  
   - The `README` should explain the project, setup steps, and core principles.

3. **Branches**  
   - Create a `main` branch.  
   - Create a `dev` branch and set **`dev` as the default branch** on GitHub.  
   - All feature development begins from `dev`.

---

## Local Development Rules

1. **Feature Branches**  
   - Start every new feature from the `dev` branch.  
   - **Never commit directly to `dev`.**  
   - Feature branches must be named:  
     ```
     feat/short-feature-description
     ```

2. **Fix & Experiment Branches**  
   - For bug fixes:  
     ```
     fix/short-fix-description
     ```
   - For experiments:  
     ```
     experimental/short-experiment-description
     ```
   - These are usually branched off from a feature branch.  
   - **Never merge sub-branches (fix/experimental) into their parent without permission.**

3. **Merge Policy**  
   - Do **not** merge your feature branch into `dev` without explicit permission.  
   - Do **not** merge fix/experimental branches without explicit permission.  
   - Pull Requests (PRs) are only created when explicitly instructed.

4. **Pushing Policy**  
   - Do **not** push directly to `origin` without permission.  
   - Always ask before pushing changes upstream.

---

## Summary of Rules

- ✅ Work only in feature/fix/experimental branches.  
- ✅ Always branch off `dev`.  
- ✅ Keep `main` stable, `dev` as default, and feature branches isolated.  
- 🚫 Never work directly in `dev` or `main`.  
- 🚫 Never push, merge, or PR without explicit approval.  

---