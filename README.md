![Alt text](http://gioco.pro/wp-content/uploads/2014/09/logo_small2.png "A gamification js sdk Gioco Pro")

# Gioco Pro (current version - 0.0.2)
Gioco Pro JS SDK integrate with [Gioco Pro service](http://www.gioco.pro)
A easy way to implement gamification based on plug and play concept. Doesn't matter if you already have a full and functional database, Gioco will smoothly integrate everything and provide all methods and analytics that you might need.

## Installation

**Gioco Pro** is available to download [GitHub](https://raw.githubusercontent.com/GiocoApp/gioco-js-sdk/master/gioco-min.js)

- First of all you need to download Gioco JS SDK, you can do this clicking on the download button above.
- Add the gioco-sdk-min.js file to your project and load it inside the <head> tag

```html
<script src="gioco-sdk-min.js"></script>
```

# Usage

-----------

## You can already access your dashboard at [Gioco Pro](http://app.gioco.pro) and start to setup you application. It has it's own tutorial and is quite simple!

### After yoru application send the frist events you will be ready to create your badges, points and levels

-----------


- Instantiate a Gioco object inside you javascript code, passing your [Application Token](http://app.gioco.pro) (that you get after regiter on Gioco Pro) as a string argument

```javascript
gioco = new Gioco('YOUR TOKEN HERE')
```

Now you are ready to use this instance to make as many requests as you want to Gioco API.

## Resource

### Get User data
**getResource** *(user_id: ```Integer```)*

Gioco instance have an method called **getResource**, it expect an integer argument representing the user unique id into your application.

Examples:

```javascript
gioco = new Gioco('YOUR TOKEN HERE')
gioco.getResource(1)
```

## Events

### Tracking Events
**trackEvent** *(event_name: ```String```, user_id: ```Integer```)*

Gioco instance have an method called **trackEvent**, it expect two arguments, the first one a string, the name of the event. The second is an integer that represents the user unique id into your application.

- **event_name** parameter is a string of the name of the event.
- **user_id** parameter is a integer of resource unique id into your application.


Examples:

```javascript
gioco = new Gioco('YOUR TOKEN HERE')
gioco.trackEvent('login', 1)
```

## Ranking

### Get Ranking
**getRanking** *(size: ```Integer```(default: 100), batch: ```Integer```(default: 1))*

Gioco instance have an method called **getRanking**, it expect two integer arguments representing the size of each batch (the max number is 100) and the batch you want to acces, those arguments are intended to paginate the ranking.

Examples:

```javascript
gioco = new Gioco('YOUR TOKEN HERE')
gioco.getResource(1)
```