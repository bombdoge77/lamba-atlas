# HTTP Message Protocol
This document describes how HTTP messages sent and received to and from the REST API should look.

## Requests
These examples show how requests made from the client side should look.

### Post
```json
{
	"type": "get-post",
	"payload": {
		"id": "ad7svd9" // some id string
	}
}
```

## Responses
These examples show how responses from the API look.

### Post
```json
{
	"type": "post",
	"payload": {
		// contains a post, see data structures below
	}
}
```

## Data structures
### Post
```json
{
	"id": "7sc4wdgb7a", // some id string
	"title": "Hello",
	"body": "Lorem ipsum",
	"user-id": "5ae7fcbxk9", // some id string
	"comments": []
}
```

### Comment
```json
{
	"user-id": "",
	"body": "",
	"children": [] //list of comments, empty if there are no replies
}
```

### User
```json
{
	"id": "",
	"name": "",
	"picture": "", // how to store? maybe change to picture-id?
	"country": "",
	"description": ""
	// where should we store login hash etc?
}
```