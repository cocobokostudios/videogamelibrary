param projectName string = 'videogamelibrary'
param targetLocation string = 'eastus2'

@secure()
param swaRepositoryToken string

targetScope = 'subscription'

resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: projectName
  location: targetLocation
  tags: {
    'Project': projectName
  }
}

module staticWebApp './staticwebapp.bicep' = {
  name: 'staticWebAppDeployment'
  scope: rg
  params: {
    targetLocation: rg.location
    projectName: projectName
    repositoryToken: swaRepositoryToken
  }
}
