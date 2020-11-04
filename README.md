# COVID-19 Behind Bars

This is a monorepo containing all code for the COVID-19 Behind Bars project.

## Getting Started

This project is managed using yarn workspaces. To get started, clone the repo and install all dependencies with:

```
yarn install
```

## Website (`/packages/gatsby-ucla-site`)

Run the Gatsby site in development mode with

```
yarn workspace gatsby-ucla-site develop
```

and perform a build with:

```
yarn workspace gatsby-ucla-site build
```

## National Map (`/packages/national-map`)

Run the national map in development mode with:

```
yarn workspace national-map start
```

Create a build that places the map in the static site `public` directory with

```
yarn workspace national-map build
```
