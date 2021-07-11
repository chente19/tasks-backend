CREATE database if not exists notesdatabase;

-- roles table
CREATE TABLE IF NOT EXISTS notesdatabase.roles(
    ID_ROLE int PRIMARY KEY AUTO_INCREMENT,
	role_name varchar(255) NOT NULL UNIQUE CHECK (role_name <> '')
);

-- users table
CREATE TABLE IF NOT EXISTS notesdatabase.users(
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
    FOREIGN KEY (FK_USER_ROLE) REFERENCES notesdatabase.roles(ID_ROLE)
);

-- tasks table
CREATE TABLE IF NOT EXISTS notesdatabase.tasks(
	TASK_ID int PRIMARY KEY,
	record_created_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	record_modified_on_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	record_updated_by_user varchar(255) NOT NULL DEFAULT 'NA',
	title varchar(255) NOT NULL,
	content varchar(255) NOT NULL,
	task_status BOOL DEFAULT 1,
	FK_RECORD_CREATED_BY_USER int NOT NULL,
	FOREIGN KEY (FK_RECORD_CREATED_BY_USER) REFERENCES notesdatabase.users(USER_NUMBER)
);

INSERT INTO notesdatabase.roles(role_name)
VALUES('admin');