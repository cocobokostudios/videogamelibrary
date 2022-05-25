# Supported Public Cloud Platform

* Status: "accepted"
* Date: 2022-05-21

## Context and Problem Statement
VGL is a passion project that is self-funded by Cocoboko Studios. It may 

## Decision Drivers <!-- optional -->

* [ADR-0001](0001-microsoft-azure.md)
* Cost

## Considered Options

* No Constraint
    Let the architecture and development be driven purely by the skills of the development team and the requirements of the project. 
* Serverless-Only
    Use only the [serverless features provided by Microsoft Azure](https://azure.microsoft.com/en-ca/solutions/serverless/#overview)
* Serverless-First
    Design features with [serverless features](https://azure.microsoft.com/en-ca/solutions/serverless/#overview) and [architectures](https://docs.microsoft.com/en-us/azure/architecture/browse/?terms=serverless), but still with the ability to enable other non-serverless features when serverless options are not available.

## Decision Outcome

Chosen option: "Serverless-First", because:

* Low-cost committent to only pay for "what we use" in the solution.
* Keeps freedom of choice for other technologies when serverless options add extra overhead
