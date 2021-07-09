CREATE database if not exists notesdatabase;
USE notesdatabase;

-- Role table
CREATE TABLE IF NOT EXISTS ROLES(
    ID_ROLE int PRIMARY KEY AUTO_INCREMENT,
	role_name varchar(255) NOT NULL UNIQUE CHECK (role_name <> '')
);

-- Users table
CREATE TABLE IF NOT EXISTS USERS(
    USER_NUMBER int PRIMARY KEY,
  	user_password varchar(255) NOT NULL,
  	user_name varchar(255) NOT NULL CHECK (user_name <> ""),
  	user_first_lastname varchar(255) NOT NULL CHECK (user_first_lastname <> ""),
  	user_second_lastname varchar(255) NOT NULL CHECK (user_second_lastname <> ""),
	user_status BOOL DEFAULT 1,
	user_creation_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	user_modified_on_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	user_created_by varchar(255) NOT NULL DEFAULT '999',
	user_modified_by varchar(255) NOT NULL DEFAULT 'NA',
	FK_USER_ROLE int NOT NULL,
    FOREIGN KEY (FK_USER_ROLE) REFERENCES ROLES(ID_ROLE)
);