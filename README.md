# Video Game Library (VGL)
An application for managing your ever-growing collection of video games and video game related things where YOU keep your own collection data.

Check out the production version of the application here: [LINK](https://delightful-mushroom-0c82d900f.1.azurestaticapps.net/).

## Goals
The goal is pretty straight forward: create an open application that gives video game ethusiasts the ability to manage their collection while keeping their own collection data. This way, if the application goes away, they still have it in a format that is consumable in other applications (such as Excel or Google Sheets).

With respect to design goals, there are a few (alpha) pillars we are noodling with, but here's the first draft:
- Client is Core
- Services are Optional
- Collection Data is the User's

Each of them have implications on the solution design, issue prioritization, and development of the application-- but we'll flesh them out in time.

## How to use VGL?
Tutorial video or doc is coming as soon as v0.2 is complete and this thing has some good functionality.

## Development 
| Branch | Status | Link               | Description |
|--------|--------|--------------------|-------------|
| main   | ![Build status for main branch](https://github.com/cocobokostudios/videogamelibrary/actions/workflows/ci-cd.yml/badge.svg?branch=main)    |  [LINK](https://delightful-mushroom-0c82d900f.1.azurestaticapps.net/) | **stable** The "production" version of the application that is not feature complete. |
| rc/vNext | ![Build status for rc branch](https://github.com/cocobokostudios/videogamelibrary/actions/workflows/ci-cd.yml/badge.svg?branch=rc/v0.2) |  [Coming Soon](#) | **unstable** The "beta" version of the application, including upcoming features. Should be considered unstable and used at your own risk. |

### Environment Setup
This project uses DevContainers/Codespaces with Visual Studio Code for development. Make sure you have one of the two at your disposal before cloning the repository.

To see an example of how to get yourself setup with DevContainers or Codespaces, check out this video to see an example: [LINK](https://youtu.be/rYfsNBODfZc).

To learn more, use the following links to learn more:

* [DevContainers](https://code.visualstudio.com/docs/remote/containers-tutorial)
* [Codespaces](https://code.visualstudio.com/docs/remote/codespaces)
* [Visual Studio Code](https://code.visualstudio.com/Docs)

### Why did you \<your question here\>? 
Great question! Check out the [`docs/adr`](https://github.com/cocobokostudios/videogamelibrary/tree/main/docs/adr) for [Architecture Decision Records](https://adr.github.io/) that document the "why" a choice was made.

### I have questions/feedback!
And we have answers. Check out the [discussions tab](https://github.com/cocobokostudios/videogamelibrary/discussions/) here on GitHub to strike up a thread with your feedback.

### I found a bug!
Great! If you could take a moment to report it as [an issue](https://github.com/cocobokostudios/videogamelibrary/issues), we'll get on it as soon as possible.
