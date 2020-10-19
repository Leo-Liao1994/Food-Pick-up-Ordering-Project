## GET Routes
GET /
GET /menu
GET /register
GET /login
GET /users/:user_id

<!-- GET /users/:user_id/orders
GET /users/:user_id/orders/:order_id -->

GET /orders
GET /orders/:order_id


## POST Routes
POST /register
POST /login
POST /logout

<!-- POST /users/:user_id/orders      confirmation -->

POST /orders      <!--confirmation-->

## PUT Routes
<!-- PUT /users/:user_id/orders/:order_id     <!--to update the state of an order> -->

PUT /orders/:order_id 


## DELETE Routes
<!-- DELETE /users/:user_id/orders/:order_id/ -->

DELETE /orders/:order_id/
