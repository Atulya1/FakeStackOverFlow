[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/8-yb8gCE)
# Homework 3

Read homework specifications [here](https://northeastern-my.sharepoint.com/:w:/r/personal/j_mitra_northeastern_edu/Documents/cs%205500/CS5500%20Foundations%20of%20Software%20Engineering.docx?d=wf0fe626cdd1e44558d38e6e595b6e433&csf=1&web=1&e=EDdUEu).

In the sections below, list and describe each contribution briefly.

## Kevin Contribution
- Frontend implementation
-- Moved from local data model to retrieving data from API endpoints

## Team Member 2 Contribution (Atul)
1. Server design and endpoints
2. Client service 
3. design documents
4. design patterns

*Add your team's class and sequence diagrams to the design directory*. It is enough to document the design of the server. You can assume the client to be an external entity that will trigger events in the server.

You will get 10% extra credit if you implement design patterns and explain how you have used them in this README.

Design Pattern

1. Singleton Pattern
    - I have used singleton pattern to create mongodb database connectivity. We can only create a single instance of the DataService class.
    - If we try and create another instance of the DataService class, it throws an error, "You can only create one instance!".
2. Factory Pattern
    - I have applied the Factory design pattern to the sorting mechanism of the questions. I have a created a new class called "QuestionSortFactory" in the server/service/question-sort-service.js file.
    - This class has a method called "createSorter" which return an object of the appropriate sort class based on the "sortType".

