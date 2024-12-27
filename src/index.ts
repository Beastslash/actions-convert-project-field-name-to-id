import core from "@actions/core"
import github from "@actions/github"
import { App, Octokit } from "octokit"

try {

  // Create the Octokit.
  const accessToken = core.getInput("github-token", {required: false});
  let octokit: Octokit | ReturnType<(typeof github)["getOctokit"]>;
  if (accessToken) {

    octokit = github.getOctokit(accessToken);

  } else {
      
    const appID = core.getInput("github-app-id", {required: true});
    const privateKey = core.getInput("github-app-private-key", {required: true});
    const installationID = parseInt(core.getInput("github-app-installation-id", {required: true}), 10);

    const app = new App({
      appId: appID,
      privateKey
    });
    
    octokit = await app.getInstallationOctokit(installationID); // Get the installation ID from the GitHub app settings.

  }

  // Get the item.
  const fieldName = core.getInput("github-project-field-name", {required: true});
  const projectID = core.getInput("github-project-id", {required: true});

  const response = await octokit.graphql<{
    node: {
      field: {
        id: string;
      };
    };
  }>(`
    query getProjectNodeID($projectID: ID!, $fieldName: String!) {
      node(id: $projectID) {
        ... on ProjectV2 {
          field(name: $fieldName) {
            ... on ProjectV2Field {
              id
            }
          }
        }
      }
    }
  `, {
    projectID,
    fieldName
  });

  const fieldID = response.node.field.id;

  core.setOutput("GITHUB_PROJECT_FIELD_ID", fieldID);

} catch (error) {

  core.setFailed(error instanceof Error ? error : "Unknown error.");

}