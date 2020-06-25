<a name="top"></a>

# labs-api-starter v0.1.0

- [UserAPI](#UserAPI)
  - [Request List of Users](#Request-List-of-Users)
  - [Request User information](#Request-User-information)

---

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

| Name  | Type     | Description                   |
| ----- | -------- | ----------------------------- |
| id    | `UUID`   | <p>Unique id of the User.</p> |
| name  | `String` | <p>Name of the User.</p>      |
| email | `String` | <p>Email of the User.</p>     |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
[
  {
    "id": "013e4ab9-77e0-48de-9efe-4d96542e791f",
    "name": "Frank Martinez",
    "email": "frank@example.com"
  },
  {
    "id": "013e4ab9-77e0-48de-9efe-4d96542e791f",
    "name": "Cathy Warmund",
    "email": "cathy@example.com"
  }
]
```

## <a name='Request-User-information'></a> Request User information

[Back to top](#top)

```
GET /user/:id
```

### Parameters - `Parameter`

| Name | Type   | Description             |
| ---- | ------ | ----------------------- |
| id   | `UUID` | <p>Users unique ID.</p> |

### Examples

Example usage:

```curl
curl -i http://localhost:3000/user/013e4ab9-77e0-48de-9efe-4d96542e791f
```

### Success response

#### Success response - `Success 200`

| Name  | Type     | Description                   |
| ----- | -------- | ----------------------------- |
| id    | `UUID`   | <p>Unique id of the User.</p> |
| name  | `String` | <p>Name of the User.</p>      |
| email | `String` | <p>Email of the User.</p>     |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
  'id': '013e4ab9-77e0-48de-9efe-4d96542e791f',
  'name': 'Frank Martinez',
  'email': 'frank@example.com'
}
```

### Error response

#### Error response - `Error 4xx`

| Name                  | Type | Description                                  |
| --------------------- | ---- | -------------------------------------------- |
| UserNotFound          |      | <p>404 The id of the User was not found.</p> |
| InvalidAuthentication |      | <p>403 Authentication failed.</p>            |

### Error response example

#### Error response example - `UserNotFound:`

```json
HTTP/1.1 404 Not Found
{
  'error': 'UserNotFound'
}
```

#### Error response example - `Forbidden:`

```json
HTTP/1.1 403 Forbidden
{
  'error': 'Authorization failed'
}
```
