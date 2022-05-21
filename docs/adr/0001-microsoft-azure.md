# Supported Public Cloud Platform

* Status: "accepted"
* Date: 2022-05-21

## Context and Problem Statement
VGL will be designed as a cloud-native solution to be hosted on one or more public cloud platforms. Each platform provides its own benefits, and drawbacks, as does designing to support multiple cloud platforms. 

Which cloud platform(s) should the project support?

## Decision Drivers <!-- optional -->

* Cost
* Available time and resourcing for development

## Considered Options

* [Microsoft Azure](https://azure.microsoft.com)
* [Google Cloud Platform](https://cloud.google.com)

## Decision Outcome

Chosen option: "Microsoft Azure", because

* Development team (me) has the most experience with Azure
* Already have purchased credits for Azure
* GitHub, a company owned by Microsoft, provides Azure integration and will likely ensure continued support of Azure. Being that the development team uses GitHub exclusively, this aligns from a DevOps-integration view.

### Positive Consequences <!-- optional -->

* Simplicity of supporting a single cloud platform.
* Uses existing knowledge and credits
* Can leverage specialized tools provided by Azure platform (e.g. Azure Bicep, Azure AD)

### Negative Consequences <!-- optional -->

* Cannot be deployed on other cloud vendors in disaster recovery scenarios.