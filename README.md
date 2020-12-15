# E-Commerce Tandem Project
<p align="center">
    <img src="img\logo.png" alt="Logo" width="320" height="160">
</p>

_This project is an electronic commerce for a Business called The Tandem Enterprise, it's about selling canary products..._

## Starting 🚀

_For this project you need Ionic/Angular, Node js and finally a mysql server working._



## Index
* [1. Data Model](#idModel)

* [2. User Requirements](#idRequirements)

* [3. Use cases](#idUseCase)

* [4. Interfaces](#idInterfaces)
  
* [5. Usability](#idUsability)

* [6. Manuals](#idManual)

* [7. Technology Stack](#idTechStack)

* [8. Technological comparison](#idCompareTech)

* [9. Repositories](#idRepositories)

* [10. Planning](#idPlanification)

* [11. Conclusions](#idConclusion)

* [12. Links and references](#idReferences)

---


<br><br>

# Data Model 📊 <a name="idModel"></a>

_On this section I will explain about the Database_


### Entities ✨
* User: This user have an id(pk) then have a name, last name, email and password.

* Address: This address have an id(pk) then have a street, number, zipCode, location, province, country.

* Order: This order have an id(pk) then have a date, total and status.

* Products: This products have and id(pk) then have a name, description, price, taxRate, image, category, availability.

---

<br><br>


### Relationships 🔌 

* A user have a lot of orders but an order have only one user

* An order contains a lot of products and products have a lot of orders

* A user have only one address but an addres have a lot of users

<br><br>

_Now I'll show you the E/R diagram and the Relational Model_
<br><br>

## E/R DIAGRAM

<p align="center">
    <img src="E-commerce ER\E-R Final Tandem.png" alt="E/R" >
</p>

## Relational Model
<br>
<p align="center">
    <img src="E-commerce ER\E-R Relacional Final Tandem.png" alt="RelationalModel" >
</p>
<br><br>

Here are the tables with the E/R to Relational

* Address: ( id(pk), street, number, zipCode, location, province, country )

* User:  ( id(pk), name, lastName, email, password, isAdmin, timestamp, id_address(fk) )

* Order Product: ( id_product(fk), id_user(fk), timestamp )

* Orders: ( id(pk), date, total, status, timestamp, id_user(fk) )

* Products: ( id(pk), name, description, price, taxRate, image, category, availability 
)

<br><br>

## User Requirement <a name ="idRequirements"></a> 👤
    Web Aplication


    If you are a guest, you will see the catalogue, home, 
    contact page and you can log-in and register also
    you can see your side-meno by your role "guest"

    If you are a user, you will see the catalogue and you can add products and buy it, you can go to

    your profile and there you can add address, edit update(not recommended yet) and log out, you can
    go to contact page, and see your side-menu by your role "user"

    If you are an admin, you will see the same features like user but you can add, edit and
    delete products and finally you can edit and remove the tracing of users


---

<br><br>

## Use case 📜
<br>
<p align="center">
    <img src="Use case\useCase2.png" alt="E/R">
</p>
---
 <br>

## Interface <a name="idInterfaces"></a>💻
<br>
First, I will show you a summary about the mockup, then you can go to see it by yourself here ->
<a href="https://xd.adobe.com/view/53abf172-94a6-4d25-7a15-86feb7d91d5d-259a/screen/0e10163d-4261-4469-a429-fe2e825ac758?fullscreen">Link to E-commerce Tandem mockup</a>
<br><br>

###  Main View

<p align="center">
    <img src="img\mainView.png" alt="MainView" >
</p>

_This gonna be the main view where you can use three buttons, one to go to the catalogue then one to log-in or log-out and finally one to go to the contact page_
<br><br>
<br>
<br>
<p align="center">
    <img src="img\catalogueView.png" alt="MainView" >
</p>

_This is the catalogue page, here if you are guest, you can't go to profile and add to cart/payment but if you are a user you can do it_
<br><br><br><br><br>

<p align="center">
    <img src="img\cartView.png" alt="MainView" >
</p>


_Here is the cart list, here you cand checkout your order and will send the order to the backend_

If you want to see more, go to <a href="https://xd.adobe.com/view/53abf172-94a6-4d25-7a15-86feb7d91d5d-259a/screen/0e10163d-4261-4469-a429-fe2e825ac758?fullscreen">mockup</a>

---


<br><br>

## Usability <a name="idUsability"></a> 📝

<br><br><br>

* _Useful: that it is capable of fulfilling the specific tasks for which it has been designed. Example (Being an admin you can do a lot of features)_ 

<p align="center">
    <img src="img\adminView.png" alt="MainView" >
</p>
<br><br><br>

* _Easy to use: it must be efficient, fast and with as few errors as possible. 
Comfortable to use. You can understand easily the menus and the app._

<p align="center">
    <img src="img\allTaskView.png" alt="MainView" >
</p>

<br><br><br>

* _Easy to learn: no excessive time is needed to learn how to work with the application and it is easy to remember how it works. 
Easy to understand_
<br><br><br><br><br>


<br><br><br>

* _Elegant in its design: to favour the user's perception and emotions._
<p align="center">
    <img src="img\mainView.png" alt="MainView" >
</p>

<br><br><br>


* _It is efficient: It measures the effort to achieve an objective._

<p align="center">
    <img src="img\loggedView.png" alt="MainView" >
</p>

<br><br><br>

* _The user must be able to initiate actions and control tasks_

<p align="center">
    <img src="img\checkoutView.png" alt="MainView" >
</p>

<br><br><br>

* _The user must be able to customize the interface, the use can change the theme between light and dark_


<p align="center">
    <img src="img\darkMode.png" alt="MainView" >
</p>

<br><br><br>

* _The user must be able to access all the content, here you have 3 roles: guest, user, admin and you can access to the content_

<p align="center">
    <img src="img\allTaskView.png" alt="MainView" >
</p>

<br><br><br>

* _Error recovery
Minimise the risk of accidental actions (e.g. typing an email to ensure that the @ is present, putting a surname to ensure that it is not left blank)
Enabling stock reversal and recovery
Take into account potential user errors._

<p align="center">
    <img src="img\invalidRegister.png" alt="MainView" width="320" >
</p>

<br><br><br>

* _Simplicity of design
No overloading the interface with unnecessary elements
The information in the interface will be the minimum essential
The interface will be SIMPLE and easy to learn and remember_

<p align="center">
    <img src="img\designView.png" alt="MainView" >
</p>


<br><br><br>


* _Feedback
Appropriate response to user actions_

<p align="center">
    <img src="img\loggedView.png" alt="MainView" >
</p>


<br><br><br>


* _Colour. Colour should be considered as an additional tool in design, not a basic need. A limited set of colours is recommended, with subtle, complementary, muted colours being most appropriate in the design of business and academic interfaces._ 

<p align="center">
    <img src="img\cartView.png" alt="MainView" >
</p>

<br><br><br>


* _Form-type window layout. The visual location of the components is important because the relationship between the components is indicated by their position. A clean layout is crucial to create a smooth visual flow of information for the user._

<p align="center">
    <img src="img\registerView.png" alt="MainView" >
</p>

<br><br><br> 

* _Consistency. Whenever possible, the interface should be consistent. This implies that similar operations will have to be activated in the same way. Furthermore, ergonomics should be taken into account through menus, action bars and icons that are easy to access and identify._ 

<p align="center">
    <img src="img\cartView.png" width="300"  alt="MainView" >
    <br><br>
    <img src="img\sideMenu.png" width="200"  alt="MainView" >
    <br><br>
    <img src="img\icons.png" alt="MainView" >
    
</p>
<br><br><br>

* _Recallability. The interface must include mechanisms to allow users to recover from errors. Example (you as admin can edit the tracking of the user's order, you can cancel and recover from errors_

<br><br>



<p align="center">
    <img src="img\editTrackView.png" alt="MainView" >
</p>

---

<br><br><br>

## Installation Manual 🔧 <a name="idManual"></a>

    Before start the app, you should know that you need Ionic/Angular, Node js and mysql server.


### Install node js
<br>
    
_*You need to download and install [node js](http://www.dropwizard.io/1.0.2/docs/)*_

You can check your version with: npm -v or npm version

Then, you need to git clone the repository:

_https://github.com/GonzaloSS/E-Commerce-project.git_

To clone the repository:

*git clone https://github.com/GonzaloSS/E-Commerce-project.git*

When you have the folder, go to E-commerce-project/E-commerceIonicNode/backend and on the terminal put npm install

*Do it too with E-commerce-project/E-commerceIonicNode/frontend*
<br><br>


You need to execute de SQL Script give it on the folder SQL


_Now it's time to deploy it_
    





### Deploy 📦


If you only want to see the API Back-END, import into POSTMAN the file API E-CommerceProject.postman_collection into the folder API POSTMAN

First, in the back end you need to edit db.config.js
<br>

<img src="img\db.png" width="300"  alt="MainView" >
<br>

_Where DB go database and where PASSWORD go your root password_

<br><br>

_To deploy the backend you need to put in the terminal npm start and to deploy the front end you need to put in the terminal ionic serve_

---
<br>

## TECHNOLOGY STACK <a name="idTechStack"></a>👨‍💻


_This project have a stack like MEAN but for this time isn't mongoose it's mysql and it's not only angular is Ionic/Angular_

<br><br>

MySQL
* MySQL is a relational database management system based on SQL – Structured Query Language. ...
<br><br>

Express

*   Express, is a back end web application framework for Node. js, released as free and open-source software under the MIT License.
<br><br>

Node

* Node. js is primarily used for non-blocking, event-driven servers, due to its single-threaded nature. It's used for traditional web sites and back-end API services
<br><br>

Ionic/Angular

* Ionic Framework is an open source UI toolkit for building performant, high-quality mobile and desktop apps using web technologies — HTML, CSS, and JavaScript — with integrations for popular frameworks like Angular, React, and Vue.
---

<br><br>


## TECHNOLOGICAL COMPARISON <a name="idCompareTech"></a> ⚙️

IONIC, EXPRESS, NODE JS, MYSQL(IENM):

PROS OF IENM:

* Allows for rapid prototyping

* Hybrid mobile

* It's angularjs

* Free

* It's javascript, html, and css

* Ui and theming

* Great designs

* Mv* pattern

* Reuse frontend devs on mobile

*Extensibility



PROS OF MEAN

* Javascript

* Easy

* Nosql

* Great community

* Mongoose

* Modularity

* Open source

* Organized

* Simple

* Boilerplate

---
<br>

## Repository <a name="idRepositories"></a>👨‍💻

[GonzaloSS](https://github.com/GonzaloSS/E-Commerce-project)

---
<br>

## Planning 📅  <a name="idPlanification"></a>

[Go to planning](https://github.com/users/GonzaloSS/projects/1)

---
<br>

## Conclusion <a name="idConclusion"></a> 💬

    In my conclusion was a hard weeks to made this possible but I reached big goals settings by my
    self so I'm very proud of my self, this ecommerce was good to start programming a full
    stack project so I'm very happy with this project. 
---


## Built With 🛠️

_For this project I use Ionic, Node js and MySQL_

* [Ionic](ionicframework.com) - Ionic is a complete open-source SDK for hybrid mobile app development created by Max Lynch, Ben Sperry, and Adam Bradley of Drifty Co. in 2013. The original version was released in 2013 and built on top of AngularJS and Apache Cordova. However, the latest release was re-built as a set of Web Components, allowing the user to choose any user interface framework, such as Angular, React or Vue.js.
<br><br>


* [Node.js](https://nodejs.org/es/) - Node.js is an open-source, cross-platform, back-end, JavaScript runtime environment that executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser.
<br><br>

* [MySQL](https://www.mysql.com) - MySQL is an open-source relational database management system (RDBMS). Its name is a combination of "My", the name of co-founder Michael Widenius's daughter, and "SQL", the abbreviation for Structured Query Language. A relational database organizes data into one or more data tables in which data types may be related to each other; these relations help structure the data. SQL is a language programmers use to create, modify and extract data from the relational database, as well as control user access to the database.

---
<br>

## Author ✒️


* **Juan Gonzalo Santana Santana** - *Author* - [GonzaloSS](https://github.com/GonzaloSS)


## Acknowledgment 🎁

* Thanks to The Tandem Enterprise for give us a chance to make this project and work together!! 📢

* Hope you enjoyed this and lot of thanks!! 🤓.

---