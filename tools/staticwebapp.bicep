param vglAppName string = 'vgl-app'
param projectName string = 'videogamelibrary'
param targetLocation string = resourceGroup().location

@secure()
param repositoryToken string

resource staticWebApp 'Microsoft.Web/staticSites@2021-03-01' = {
  name: vglAppName
  location: targetLocation
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  tags: {
    'Project': projectName
  }
  properties: {
    allowConfigFileUpdates: false
    branch: 'main'
    repositoryUrl: 'https://github.com/cocobokostudios/videogamelibrary'
    repositoryToken: repositoryToken
    provider: 'GitHub'
    stagingEnvironmentPolicy: 'Enabled'
    buildProperties: {
      apiBuildCommand: 'yarn run build'
      appArtifactLocation: './dist'
      appLocation: '.'
      skipGithubActionWorkflowGeneration: true
    }
  }
}

output staticWebAppDefaultHostName string = staticWebApp.properties.defaultHostname // eg gentle-bush-0db02ce03.azurestaticapps.net
output staticWebAppId string = staticWebApp.id
output staticWebAppName string = staticWebApp.name
