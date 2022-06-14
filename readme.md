# Assignment - SenseHawk

## Install - NPM

- Clone this git repository
- Go to root location
- Run `npm install`
- root url - <http://localhost:1993/>

## Install - docker

- Clone this git repository

![](https://img.shields.io/github/tag/pandao/editor.md.svg) ![](https://img.shields.io/github/release/pandao/editor.md.svg)

## Notes

- Update and deletion is owner specific, if you are not the owner of a particular vector or region, you can not update or delete.
- There is a thrid user-typr as `super-admin`, who can basically controll the whole application and can delete users.
- ` get-all-users` and `delete-user` is Super admin specific, you can not see all the users if you are not the super admin.
- If you are not an `owner` you can not do any operation to `Vector` and `Region` other that just see them, even if you are a `super-admin`
- use this credential to login as a super admin :
  ` "email": "super@admin.com", "password": "user12345",`
- Databse is hosted in MongoDB Atlas cloud.

## API Endpoints

### Auth endpoints

##### Sign Up

> - _/dev/api/signup_

> body -

```json
{
	"firstName": "Sundar",
	"lastName": "Pichai",
	"email": "aaaa@dddd.com",
	"password": "user12345",
	"role": "owner"
}
```

##### Log In

> - _/dev/api/signin_

> body -

```json
{
	"email": "aaaa@dddd.com",
	"password": "user12345"
}
```

##### Get all user - super-admin

> - _/dev/api/get-all-user_

> body -

```json
{
	"email": "aaaa@dddd.com",
	"password": "user12345"
}
```

##### Delete user - super-admin

> - _/delete-user/:id_

> response -

```json
{
	"msg": "user successfully deleted ",
	"id": "userId"
}
```

### Region endpoints

##### Add region

> - _/dev/api/add-region_

> token

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI....`

> body -

```json
{
	"name": "Delhi",
	"description": "Delhi is a great place, city of joy",
	"location": "Point",
	"coordinates": [125, 22],
	"owner": "62a7487616bd047d67661c2d"
}
```

##### Get all region

> - _/get-all-region_

> token

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI....`

> response -

```json
{
	"status": "Success",
	"Total": 2,
	"regions": [
		{
			"_id": "62a74181e130ce0b4de5ca9b",
			"uid": "REGION_SH_0435",
			"name": "Kolkata",
			"description": "Kolkata is a great place, city of joy",
			"location": "Point",
			"coordinates": [120, 12],
			"owner": "62a61083bc0f8541c1c9c189",
			"createdAt": "2022-06-13T13:54:09.604Z",
			"updatedAt": "2022-06-13T13:54:09.604Z",
			"__v": 0
		}
	]
}
```

##### Get all region - with pagination

> - _/dev/api/get-all-region/pagination?skip=1_

> token

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI....`

> response -

```json
{
	"status": "Success",
	"Total": 2,
	"regions": [
		{
			"_id": "62a74181e130ce0b4de5ca9b",
			"uid": "REGION_SH_0435",
			"name": "Kolkata",
			"description": "Kolkata is a great place, city of joy",
			"location": "Point",
			"coordinates": [120, 12],
			"owner": "62a61083bc0f8541c1c9c189",
			"createdAt": "2022-06-13T13:54:09.604Z",
			"updatedAt": "2022-06-13T13:54:09.604Z",
			"__v": 0
		}
	]
}
```

##### Get region by ID

> - _/dev/api/get-region-by-id/:id_

> token

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI....`

> response -

```json
{
	"status": "Success",
	"region": {
		"_id": "62a74181e130ce0b4de5ca9b",
		"uid": "REGION_SH_0435",
		"name": "Kolkata",
		"description": "Kolkata is a great place, city of joy",
		"location": "Point",
		"coordinates": [120, 12],
		"owner": "62a61083bc0f8541c1c9c189",
		"createdAt": "2022-06-13T13:54:09.604Z",
		"updatedAt": "2022-06-13T13:54:09.604Z",
		"__v": 0
	}
}
```

##### Update region

> - _/dev/api/update-region/:id_

> token

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI....`

> body -

```json
{
	"name": "Delhi NCR-1"
}
```

##### Delete region

> - _/dev/api/delete-region/:id_

> token

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI....`

> response -

```json
{
	"msg": "region successfully deleted ",
	"id": "regionId"
}
```

### Vector/polygon endpoints

##### Add vector

> - _/dev/api/add-vector_

> token

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI....`

> body -

```json
{
	"name": "New Vector 2",
	"description": "This is a new vector",
	"className": "vector_class_2",
	"geometry": {
		"type": "Polygon",
		"coordinates": [
			[
				[72.8125, 44.84029065139799],
				[70.15625, 39.639537564366684],
				[74.921875, 31.353636941500987],
				[103.71093749999999, 37.16031654673677],
				[72.8125, 44.84029065139799]
			]
		]
	},
	"region": "62a748d016bd047d67661c34",
	"owner": "62a7487616bd047d67661c2d"
}
```

##### Get vectoe by Id

> - _/dev/api/vector/:id_

> token

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI....`

> response -

```json
{
	"vector": {
		"geometry": {
			"type": "Polygon",
			"coordinates": [
				[
					[72.8125, 44.84029065139799],
					[70.15625, 39.639537564366684],
					[74.921875, 31.353636941500987],
					[103.71093749999999, 37.16031654673677],
					[72.8125, 44.84029065139799]
				]
			]
		},
		"_id": "62a84075b2bb35a8eca14dac",
		"uid": "VECTOR_SH_01190",
		"name": "New Vector 2-1",
		"description": "This is a new vector",
		"classid": 2164,
		"className": "vector_class_2",
		"region": "62a748d016bd047d67661c34",
		"owner": "62a7487616bd047d67661c2d",
		"createdAt": "2022-06-14T08:01:57.176Z",
		"updatedAt": "2022-06-14T08:06:30.388Z",
		"__v": 0
	},
	"area": 2176133383664.66,
	"perimeter": 7568.921192427226
}
```

##### Get all vectors

> - _/dev/api/get-all-vector_

> token

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI....`

> response -

```json
{
	"status": "Success",
	"Total": 1,
	"vectors": [
		{
			"geometry": {
				"type": "Polygon",
				"coordinates": [
					[
						[72.8125, 44.84029065139799],
						[70.15625, 39.639537564366684],
						[74.921875, 31.353636941500987],
						[103.71093749999999, 37.16031654673677],
						[72.8125, 44.84029065139799]
					]
				]
			},
			"_id": "62a84075b2bb35a8eca14dac",
			"uid": "VECTOR_SH_01190",
			"name": "New Vector 2-1",
			"description": "This is a new vector",
			"classid": 2164,
			"className": "vector_class_2",
			"region": "62a748d016bd047d67661c34",
			"owner": "62a7487616bd047d67661c2d",
			"createdAt": "2022-06-14T08:01:57.176Z",
			"updatedAt": "2022-06-14T08:06:30.388Z",
			"__v": 0
		}
	]
}
```

##### Get all vectors - with pagination

> - _/dev/api/get-all-vector/pagination?skip=1_

> token

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI....`

> response -

```json
{
	"status": "Success",
	"Total": 1,
	"vectors": [
		{
			"geometry": {
				"type": "Polygon",
				"coordinates": [
					[
						[72.8125, 44.84029065139799],
						[70.15625, 39.639537564366684],
						[74.921875, 31.353636941500987],
						[103.71093749999999, 37.16031654673677],
						[72.8125, 44.84029065139799]
					]
				]
			},
			"_id": "62a84075b2bb35a8eca14dac",
			"uid": "VECTOR_SH_01190",
			"name": "New Vector 2-1",
			"description": "This is a new vector",
			"classid": 2164,
			"className": "vector_class_2",
			"region": "62a748d016bd047d67661c34",
			"owner": "62a7487616bd047d67661c2d",
			"createdAt": "2022-06-14T08:01:57.176Z",
			"updatedAt": "2022-06-14T08:06:30.388Z",
			"__v": 0
		}
	]
}
```

##### Update vector

> - \*/dev/api/vector-update/:id

> token

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI....`

> body -

```json
{
	"name": "New Vector 2-1"
}
```

##### Delete vector

> - _/dev/api/vector-update/:id_

> token

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI....`

> body -

> response -

```json
		{
			"msg": 'vector successfully deleted ',
			"id": "vectorId",
		}
`

```
