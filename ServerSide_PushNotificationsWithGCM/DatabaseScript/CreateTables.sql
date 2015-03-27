DROP TABLE IF EXISTS _device;
DROP TABLE IF EXISTS _user;
DROP TABLE IF EXISTS _client;

CREATE TABLE _client
(
  _name character varying(120) NOT NULL,
  _password character varying(250) NOT NULL,
  CONSTRAINT _client_pkey PRIMARY KEY (_name)
);

CREATE TABLE _user
(
  _name character varying(20) NOT NULL,
  _client character varying(120) NOT NULL,
  CONSTRAINT _user_pkey PRIMARY KEY (_name),
  CONSTRAINT _client FOREIGN KEY (_client)
      REFERENCES _client (_name) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);


CREATE TABLE _device
(
  _key integer NOT NULL,
  _user character(20) NOT NULL,
  CONSTRAINT _device_pkey PRIMARY KEY (_key),
  CONSTRAINT _user FOREIGN KEY (_user)
      REFERENCES _user (_name) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);