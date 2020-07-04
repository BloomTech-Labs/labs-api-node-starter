<a name="top"></a>
# labs-api-starter v0.1.0



 - [PingAPI](#PingAPI)
   - [Root path, ping](#Root-path,-ping)
 - [ProfileAPI](#ProfileAPI)
   - [Request List of Profiles](#Request-List-of-Profiles)
   - [Request User information](#Request-User-information)
 - [UserAPI](#UserAPI)
   - [Request List of Users](#Request-List-of-Users)
   - [Request User information](#Request-User-information)

___


# <a name='PingAPI'></a> PingAPI

## <a name='Root-path,-ping'></a> Root path, ping
[Back to top](#top)

```
GET /
```

### Examples
Example usage:

```curl
curl -i http://localhost:3000/
```

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
  "api": "up"
}
```

# <a name='ProfileAPI'></a> ProfileAPI

## <a name='Request-List-of-Profiles'></a> Request List of Profiles
[Back to top](#top)

```
GET /profile/
```

### Examples
Example usage:

```curl
curl -i http://localhost:8000/profiles
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `UUID` | <p>Unique id of the Profile.</p> |
| name | `String` | <p>Name of the Profile.</p> |
| email | `String` | <p>Email of the Profile.</p> |
| avatar | `String` | <p>Avatar url for the Profile.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
[
  {
    "id": "013e4ab9-77e0-48de-9efe-4d96542e791f",
    "name": "Frank Martinez",
    "email": "frank@example.com",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg"
  },
  {
    "id": "013e4ab9-77e0-48de-9efe-4d96542e791f",
    "name": "Cathy Warmund",
    "email": "cathy@example.com",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/geneseleznev/128.jpg"
  }
]
```

## <a name='Request-User-information'></a> Request User information
[Back to top](#top)

```
GET /profile/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `UUID` | <p>Profile's unique ID.</p> |

### Examples
Example usage:

```curl
curl -i http://localhost:3000/Profile/013e4ab9-77e0-48de-9efe-4d96542e791f
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `UUID` | <p>Unique id of the Profile.</p> |
| name | `String` | <p>Name of the Profile.</p> |
| email | `String` | <p>Email of the Profile.</p> |
| avatar | `String` | <p>Avatar url for the Profile.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
  "id": "013e4ab9-77e0-48de-9efe-4d96542e791f",
  "name": "Frank Martinez",
  "email": "frank@example.com",
  "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg"
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| ProfileNotFound |  | <p>404 The id of the Profile was not found.</p> |
| InvalidAuthentication |  | <p>403 Authentication failed.</p> |

### Error response example

#### Error response example - `ProfileNotFound:`

```json
HTTP/1.1 404 Not Found
{
  "error": "ProfileNotFound"
}
```

#### Error response example - `Forbidden:`

```json
HTTP/1.1 403 Forbidden
{
  "error": "Authorization failed"
}
```

# <a name='UserAPI'></a> UserAPI

## <a name='Request-List-of-Users'></a> Request List of Users
[Back to top](#top)

```
GET /users/
```

### Examples
Example usage:

```curl
curl -i http://localhost:8000/users
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `UUID` | <p>Unique id of the User.</p> |
| name | `String` | <p>Name of the User.</p> |
| email | `String` | <p>Email of the User.</p> |
| avatar | `String` | <p>Avatar url for the User.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
[
  {
    "id": "013e4ab9-77e0-48de-9efe-4d96542e791f",
    "name": "Frank Martinez",
    "email": "frank@example.com",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg"
  },
  {
    "id": "013e4ab9-77e0-48de-9efe-4d96542e791f",
    "name": "Cathy Warmund",
    "email": "cathy@example.com",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/geneseleznev/128.jpg"
  }
]
```

## <a name='Request-User-information'></a> Request User information
[Back to top](#top)

```
GET /user/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `UUID` | <p>Users unique ID.</p> |

### Examples
Example usage:

```curl
curl -i http://localhost:3000/user/013e4ab9-77e0-48de-9efe-4d96542e791f
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `UUID` | <p>Unique id of the User.</p> |
| name | `String` | <p>Name of the User.</p> |
| email | `String` | <p>Email of the User.</p> |
| avatar | `String` | <p>Avatar url for the User.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
  "id": "013e4ab9-77e0-48de-9efe-4d96542e791f",
  "name": "Frank Martinez",
  "email": "frank@example.com",
  "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg"
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| UserNotFound |  | <p>404 The id of the User was not found.</p> |
| InvalidAuthentication |  | <p>403 Authentication failed.</p> |

### Error response example

#### Error response example - `UserNotFound:`

```json
HTTP/1.1 404 Not Found
{
  "error": "UserNotFound"
}
```

#### Error response example - `Forbidden:`

```json
HTTP/1.1 403 Forbidden
{
  "error": "Authorization failed"
}
```
