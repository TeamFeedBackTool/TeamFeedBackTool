DROP DATABASE FeedbackTool;

CREATE DATABASE FeedbackTool;

USE FeedbackTool;

CREATE TABLE Users (
  pk_userId INT PRIMARY KEY AUTO_INCREMENT,
  email  VARCHAR(60),
  firstname VARCHAR(30),
  lastname  VARCHAR(30),
  password  VARCHAR(20),
  lastLogin DATE
);

CREATE TABLE Project (
  pk_projectId INT PRIMARY KEY AUTO_INCREMENT,
  projectname  VARCHAR(40),
  fk_leaderId  INT,

  CONSTRAINT FOREIGN KEY fk_leaderId(fk_leaderId) REFERENCES Users (pk_userId)
);

CREATE TABLE worksAt (
  pk_fk_userId    INT,
  pk_fk_projectId INT,

  CONSTRAINT FOREIGN KEY pk_fk_userId(pk_fk_userId) REFERENCES Users (pk_userId),
  CONSTRAINT FOREIGN KEY pk_fk_projectId(pk_fk_projectId) REFERENCES Project (pk_projectId),

  CONSTRAINT PRIMARY KEY pk_fk_userId(pk_fk_projectId)
);

CREATE TABLE Feedback (
  pk_feedbackId INT PRIMARY KEY AUTO_INCREMENT,
  fk_userId     INT,
  fk_projectId  INT,
  date          DATE,
  data          VARCHAR(50),

  CONSTRAINT FOREIGN KEY fk_userId(fk_userId) REFERENCES Users (pk_userId),
  CONSTRAINT FOREIGN KEY fk_projectId(fk_projectId) REFERENCES Project (pk_projectId)
);

CREATE TABLE GroupFeedback (
  pk_groupFeedbackId INT PRIMARY KEY AUTO_INCREMENT,
  fk_projectId       INT,
  date               DATE,
  data               VARCHAR(50),

  CONSTRAINT FOREIGN KEY fk_projectId1(fk_projectId) REFERENCES Project (pk_projectId)
);