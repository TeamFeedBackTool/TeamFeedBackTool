DROP DATABASE FeedbackTool;

CREATE DATABASE FeedbackTool;

USE FeedbackTool;

CREATE TABLE Users (
  pk_userId INT PRIMARY KEY AUTO_INCREMENT,
  email  VARCHAR(60),
  firstname VARCHAR(30),
  surname  VARCHAR(30),
  password  VARCHAR(150),
  lastLogin DATE
);

CREATE TABLE Project (
  pk_projectId INT PRIMARY KEY AUTO_INCREMENT,
  projectname  VARCHAR(40),
  fk_leaderId  INT,

  CONSTRAINT FOREIGN KEY (fk_leaderId) REFERENCES Users (pk_userId)
);

CREATE TABLE worksAt (
  pk_fk_userId    INT,
  pk_fk_projectId INT,

  CONSTRAINT FOREIGN KEY (pk_fk_userId) REFERENCES Users (pk_userId),
  CONSTRAINT FOREIGN KEY (pk_fk_projectId) REFERENCES Project (pk_projectId)
);

CREATE TABLE Feedback (
  pk_feedbackId INT PRIMARY KEY AUTO_INCREMENT,
  fk_userId     INT,
  fk_projectId  INT,
  date          DATE,
  sliderValue_stress INT(2),
  sliderValue_motivation INT(2),
  work_performance_satisfied BOOLEAN,
  technicalSkills BOOLEAN,

  CONSTRAINT FOREIGN KEY (fk_userId) REFERENCES Users (pk_userId),
  CONSTRAINT FOREIGN KEY (fk_projectId) REFERENCES Project (pk_projectId)
);
