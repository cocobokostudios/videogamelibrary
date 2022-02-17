param vglAppName string = 'vgl-app'
param targetLocation string = resourceGroup().location

resource staticWebApp 'Microsoft.Web/staticSites@2021-03-01' = {
  name: vglAppName
  location: targetLocation
  sku: {
    tier: 'Free'
  }
}
