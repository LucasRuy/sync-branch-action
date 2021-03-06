const core = require('@actions/core')

/**
 * setVariablesValues
 * --------------------
 * Sets all default values used in this action.
 * 
 * @function
 * @param {Object} repository Object with current repository infos.
 * @returns {Object} Returns an object with a set of variables.
 */
async function setVariablesValues (repository) {
  const PULL_REQUEST_TITLE = core.getInput('PULL_REQUEST_TITLE')
  const PULL_REQUEST_BODY = core.getInput('PULL_REQUEST_BODY')
  const SOURCE_BRANCH = core.getInput('SOURCE_BRANCH')
  const DESTINATION_BRANCH = core.getInput('DESTINATION_BRANCH')

  core.info('Verifying if required fields is setted.')
  if (!SOURCE_BRANCH || !DESTINATION_BRANCH) {
    throw new Error('You need to enter a valid value in the "SOURCE_BRANCH" and "DESTINATION_BRANCH" fields.')
  }

  const repo = repository.name
  const owner = repository.owner.login

  const title = PULL_REQUEST_TITLE || `
    update: ${DESTINATION_BRANCH} to ${SOURCE_BRANCH}
  `
  const body = PULL_REQUEST_BODY || `
    This is an automatic Pull Request to keep ${DESTINATION_BRANCH} up to date with ${SOURCE_BRANCH}! 🔄
  `

  core.info('Setted default values.')
  return {
    repositoryValues: {
      repo, owner
    },
    pullRequestValues: {
      title, body
    }
  }
}

module.exports = setVariablesValues
