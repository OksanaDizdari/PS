DROP TABLE IF EXISTS _notification;
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
  _identifier character varying(20) NOT NULL,
  _client character varying(120) NOT NULL,
  CONSTRAINT _user_pkey PRIMARY KEY (_identifier,_client),
  CONSTRAINT _client FOREIGN KEY (_client)
      REFERENCES _client (_name) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE _device
(
 _key integer NOT NULL,
 _user varchar(20) NOT NULL,
 _client character varying(120) NOT NULL,
  CONSTRAINT _device_pkey PRIMARY KEY (_key,_user,_client),
  CONSTRAINT _user FOREIGN KEY (_user, _client)
  REFERENCES _user(_identifier, _client) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE _notification
(
 _key serial NOT NULL,
 _user varchar(20) NOT NULL,
 _client character varying(120) NOT NULL,
 _device integer NOT NULL,
 _delivered boolean DEFAULT false,
  CONSTRAINT _notification_pkey PRIMARY KEY (_key, _client),
  CONSTRAINT _user FOREIGN KEY (_user, _client)
  REFERENCES _user(_identifier, _client) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT _device FOREIGN KEY (_device, _user, _client)
  REFERENCES _device(_key,_user,_client) ON UPDATE CASCADE ON DELETE CASCADE
);