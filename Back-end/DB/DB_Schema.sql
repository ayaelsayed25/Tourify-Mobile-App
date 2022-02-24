create database tourify;
use tourify;
CREATE TABLE user (
    email VARCHAR(200) PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL,
    password VARCHAR(200) ,
    photo varchar(500), #TODO 
    country varchar(200),
    bio TEXT,
	notify_token varchar(200),
    notifications_count INT default 0,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    google boolean 
);

CREATE TABLE Post(
	post_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	email VARCHAR(200) NOT NULL,
	body TEXT NOT NULL,
	duration INT,
	organisation VARCHAR(200),
	rate INT,
	budget INT,              
    currency varchar(100),   #TODO
	number_of_comments INT,
	number_of_likes INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE PostLocation(
	post_id INT NOT NULL,
	latitude DOUBLE,
	longitude DOUBLE,
	PRIMARY KEY(post_id, latitude, longitude),
	FOREIGN KEY(post_id) REFERENCES Post(post_id) ON delete cascade

);

#TODO
CREATE TABLE PostPhoto(
	post_id INT NOT NULL,
	photo VARCHAR(400) NOT NULL,
	PRIMARY KEY(post_id, photo),
    FOREIGN KEY(post_id) REFERENCES Post(post_id) ON delete cascade
);

CREATE TABLE PostTags(
	post_id INT,
    tag_name VARCHAR(200),
	PRIMARY KEY(post_id, tag_name),
    FOREIGN KEY(post_id) REFERENCES Post(post_id) ON delete cascade
);

CREATE TABLE Likes(
	post_id INT REFERENCES Post(post_id),
	email VARCHAR(200) NOT NULL,
	CONSTRAINT PK_Likes PRIMARY KEY (post_id,email)
);

CREATE TABLE Comments(
	comment_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	post_id INT REFERENCES Post(post_id),
	email VARCHAR(200) NOT NULL,
	body TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Notification(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	post_id INT REFERENCES Post(post_id),
	sender_email VARCHAR(200) NOT NULL REFERENCES user(email),
	receiver_email VARCHAR(200) NOT NULL REFERENCES user(email),
	comment_id INT REFERENCES Comments(comment_id) ON DELETE CASCADE,
	viewed boolean,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE PostPhoto ADD CONSTRAINT photoPostFK FOREIGN KEY(post_id) REFERENCES Post(post_id) ON delete cascade;
ALTER TABLE PostTags ADD CONSTRAINT postTagsFK FOREIGN KEY(post_id) REFERENCES Post(post_id) ON delete cascade;
ALTER TABLE PostLocation ADD CONSTRAINT postLocationFK FOREIGN KEY(post_id) REFERENCES Post(post_id) ON delete cascade;
ALTER TABLE Post ADD CONSTRAINT postUserFK FOREIGN KEY(email) REFERENCES user(email);
ALTER TABLE Likes ADD CONSTRAINT likesUserFK FOREIGN KEY(email) REFERENCES user(email);