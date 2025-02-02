# actions-get-project-field-id-from-name
A GitHub action used to get a project field ID from its name.

## Inputs
| Name | Description | Required? |
| :- | :- | :- |
| `github-project-id` | The project ID (not number) of the field. If you don't know the project ID, consider using [get-project-id-from-number](https://github.com/Beastslash/actions-convert-project-number-to-id). | Yes |
| `github-project-field-name` | The name of the field that you want to get the ID of. **Case-sensitive.** | Yes |
| `github-app-id` | The app ID of the GitHub app that you are authenticating with. | Only if `github-personal-access-token` is not provided |
| `github-app-private-key` | A private key of the GitHub app that you are authenticating with. | Only if `github-personal-access-token` is not provided |
| `github-app-installation-id` | The ID of the installation that you are authenticating with.<br /><br />You can get this from checking the URL after hitting "Configure" at `https://github.com/{USER or ORGANIZATION}/{REPOSITORY}/settings/installations`. | Only if `github-personal-access-token` is not provided |
| `github-personal-access-token` | The personal access token that you are authenticating with. [GITHUB_TOKEN won't work because they currently cannot access projects.](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/automating-projects-using-actions#github-actions-workflows) | Only if `github-app-id`, `github-app-private-key`, and `github-app-installation-id` are not provided |

## Outputs
| Name | Description |
| :- | :- |
| `GITHUB_PROJECT_FIELD_ID` | The requested project field ID. |

## Permissions
Your GitHub app installation or your personal access token must have at least the following permissions:
* Read access to issues (Repository permissions > Issues)
* Read access to projects (Organization permissions > Projects)

## Example usage
```yml
- name: Convert project field name to ID
  id: convert_project_field_name_to_ID
  uses: Beastslash/actions-get-project-field-id-from-name@v1.0.1
  with:
    github-project-id: ${{ steps.convert_project_number_to_id.outputs.GITHUB_PROJECT_ID }}
    github-project-field-name: ${{ vars.ISSUES_SYNC_GITHUB_PROJECT_FIELD_NAME }}
    github-app-id: ${{ vars.ISSUES_SYNC_GITHUB_APP_ID }}
    github-app-private-key: ${{ secrets.ISSUES_SYNC_GITHUB_APP_PRIVATE_KEY }}
    github-app-installation-id: ${{ vars.ISSUES_SYNC_GITHUB_APP_INSTALLATION_ID }}
```