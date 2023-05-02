# Pub Quiz Test

## Intro

Simple Pub Quiz app done in React with json-server as storage created with Vite

## Start json-server

To run json-server run `npm run server`.
The project uses .env files to start the server and the same paths are used to fetch data so that it can be easily switched to a hosted database links.

## Start project

To start project run `npm run dev`

## Project features

### Main functionalities

-View all quizzes
-Create New Quiz
-Start Quiz (shown using react-slick with progress bar and answers hiddden by default and shown by clicking on the "Show Answer" button)
-Delete Quiz
-TODO Edit Quiz in modal

## Project styling

### Base component style and functionality library

[Picocss](https://picocss.com/)

### Styling for React components

React component are styled with styled-components in separate .style.ts files (ex: HomeStyled.ts).

## Project structure

### Routing

Routing is done with react-router-dom.
And data is provided to the router trough the loader prop `loader={getQuizzes}` in the App.tsx file.

### Calls to storage

All api calls are in `src/api/quiz-Api.ts`

### components

### dto

Base Dto for quizz and questions objects

### layouts

### pages

### utils

Utility functions (ex: function to generate custom unique id).
