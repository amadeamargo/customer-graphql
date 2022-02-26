# Customer Base 

**Resource:** [TraversyMedia series](https://www.youtube.com/watch?v=PEcJxkylcRM)
- visit `http://localhost:4000/graphql`
- Add query on the left side 
- Click the play button

## GET /customer
```
{
  customer(id: "1"){
    name, 
    email, 
    age
  }
}
```
## GET /customers
```
{
  customers{
    name, 
    email, 
    age
  }
}
```

## POST /addCustomer
```
mutation{
	addCustomer(name: "Willie Nelson", age: 89, email: "willie@email.com"){
    id, name, age, email
  }
}
```

## DELETE /deleteCustomer
```
mutation{
	deleteCustomer(id: "1"){
    id
  }
}
```

## UPDATE /editCustomer
```
mutation{
	editCustomer(id: "3", age: 44, email: "zacbrownband@zbb.com"){
    id, name, age, email
  }
}
```