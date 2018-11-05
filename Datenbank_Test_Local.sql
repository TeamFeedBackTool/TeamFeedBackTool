DROP DATABASE FeedbackTool;
CREATE DATABASE FeedbackTool;

USE FeedbackTool;

CREATE TABLE Users (
  pk_userId INT PRIMARY KEY AUTO_INCREMENT,
  email  VARCHAR(60),
  firstname VARCHAR(30),
  surname  VARCHAR(30),
  password  VARCHAR(100),
  lastLogin DATE
);