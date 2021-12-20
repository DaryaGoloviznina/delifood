# DeliFood

Welcome to 🌱 DeliFood, an app that tackles the saddest waste problem - food waste. 
DeliFood offers a solution to restaurants that no longer wish to thow away great food at the end of the day. 
The app is designed to help business owners sell amazing food for less and help food lovers find their favourites near them.

[<img align="center" alt="delifood.com" src="/demo/home.png" />](https://mycupofit.herokuapp.com)


DeliFood is our small contirbution to the fight against food waste and we would love to show you everything it can do.

## Technologies:

[<img align="left" alt="JavaScript" width="40px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" />][git]
[<img align="left" alt="React" width="40px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" />][git]
[<img align="left" alt="Redux"  width="40px" src="https://img.icons8.com/color/48/000000/redux.png"/>][git]
[<img align="left" alt="Node.js" width="40px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" />][git]
[<img align="left" alt="PostgreSQL" width="32px" src="https://img.icons8.com/color/50/000000/postgreesql.png"/>][git]


<br/>
<br/>
<br/>

- Frontend: React, Redux(Thunk), Tailwind, Yandex Maps
- Backend: Node.js, Express, PostgreSQL, Sequelize ORM, Bcrypt, Multer, NodeMailer

## How does it work

With DeliFood, restaurants can gather any delicious goddies they have left at the end of the day and create a ✨ MYSTERY BOX ✨.

A hungry client can check that a new box popped up near them and reserve it for a very lovely price. 
All boxes automatically have an expiry date of the same day they were created on and won't be featured on the app if no one picked them up once they have expired.

## Let's explore DeliFood

#### Welcome to the boxes page. DeliFood automatically gets user's location (with permission, of course) and displays all unfiltered boxes near the user.
#### All boxes can be fileterd by cuisine, price, distance, or name.

![Boxes Filter](demo/boxes.gif)

#### The user can, of course, change their current location at any time.
<img align="center" alt="delifood.com" src="/demo/location.png" />

## Let's Talk Boxes

#### Boxes have all the essential info, which is set by the restaurant when adding a new box. User can see the distance, the pick-up time, the price, and the amount of similar boxes they can purchase.

<img align="center" alt="delifood.com" src="/demo/detailBoxes.png" />

#### User can view more detailed info about any given box, but they won't be able to reserve the box until they sign up. 

<img align="center" alt="delifood.com" src="/demo/boxModal.png" />

#### Of course, all boxes can be shown right on the map as well. 

<img align="center" alt="delifood.com" src="/demo/map.png" />

## Let's Talk Orders

#### Once user is logged in, they can reserve a box and receive a success modal and an email with the detailes of the order.

![User Purchase](demo/success.gif)

#### User can navigate to their DeliFood minimal profile where they can filter all, active or non-active orders, as well as change their user info.

<img align="center" alt="delifood.com" src="/demo/userProfile.png" />

#### Orders contain all the neccessary info, such as the restaurant's location and contact number, unique code, status, and the option to cancel the order.

<img align="center" alt="delifood.com" src="/demo/orders.png" />

#### Now it is time to go and pick up the deliciousness!

## Let's Talk Restaurants' CRM

#### Welcome to restaurant's minimal (we like minimal design here) profile, which can be, of course, updated.

<img align="center" alt="delifood.com" src="/demo/RestaurantProfile.png" />

#### Restaurant can view active, picked up, or expired boxes. It can see how many boxes were reserved and delete any box at any time (however, reserved boxes cannot be deleted!)

![CRM Boxes](demo/RestBoxes.gif)

#### Restaurant can (and should 😉) create a new box if they feel like they have some delicious food left at the end of the day.

<img align="center" alt="delifood.com" src="/demo/NewBox.png" />

#### Restaurant can also view any active, picked up or expired orders once a hungry user reserves a box. An email is also sent to the restaurant notifying of a new order, which contains all the usefull info. 

<img align="center" alt="delifood.com" src="/demo/RestOrders.png" />

#### Once the customer paid and took a mystery box home, the order can be market as picked up and the rest is history.


### Future of DeliFood
We want keep expanding our project and leave a bigger impact in the fight against food waste and here are our plans:
<br/>

- [X] Add integrated check out
- [X] Add more businesses to our platform, such as grocery stores 
- [X] Add more customer support with WebSockets

#### Thank you for exploring DeliFood!

[git]: https://github.com/vladmilko/delifood
