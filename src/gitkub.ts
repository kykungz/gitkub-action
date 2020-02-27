import * as core from '@actions/core'
import * as github from '@actions/github'

const run = async () => {
  try {
    const token = core.getInput('github-token', { required: true })
    const client = new github.GitHub(token)
    const prNumber = github.context.payload.pull_request?.number

    if (!prNumber) {
      return console.log(
        'Could not get pull request number from context, exiting',
      )
    }

    await client.issues.addLabels({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: prNumber,
      labels: ['Status: Ready for Review'],
    })
  } catch (error) {
    core.error(error)

    core.setFailed(error.message)
  }
}

run()
