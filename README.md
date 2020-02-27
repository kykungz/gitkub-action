# Gitkub

Add `Ready for Review` label to newly opened Pull Requests.

## Usage

Add `.github/workflows/gitkub.yml`

```yaml
name: gitkub

on:
  pull_request:
    types: [opened]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: kykungz/gitkub-action@v1
        with:
          github-token: <your_github_token>
```
