DROP TABLE IF EXISTS _device;
DROP TABLE IF EXISTS _user;

CREATE TABLE _user
(
  _name character varying(20) NOT NULL,
  _password character varying(140) NOT NULL,
  CONSTRAINT _user_pkey PRIMARY KEY (_name)
);


CREATE TABLE _device
(
  _key integer NOT NULL,
  _user character(20),
  CONSTRAINT _device_pkey PRIMARY KEY (_key),
  CONSTRAINT _user FOREIGN KEY (_user)
      REFERENCES _user (_name) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);