param vglAppName string = 'vgl-app'
param projectName string = 'videogamelibrary'
param targetLocation string = resourceGroup().location

resource staticWebApp 'Microsoft.Web/staticSites@2021-03-01' = {
  name: vglAppName
  location: targetLocation
  sku: {
    tier: 'Free'
  }
  tags: {
    'Project': projectName
  }
  properties: {
    repositoryUrl: 'https://github.com/cocobokostudios/videogamelibrary'
    
  }
}
