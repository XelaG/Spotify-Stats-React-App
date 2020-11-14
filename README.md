# Information about Spotify Stats Project

This project was created by [Alex Gaignard](https://github.com/XelaG).
The goal of this project was to make a website that would indicate what
you've been listening to on spotify.

The technology use is [React](https://www.reactjs.org/)

You can preview the website [here](https://spotify-stats-react-app.vercel.app/)

## Available Scripts

In the project directory, you can run:

```
$ docker build . -t spotify-app:latest
$ docker run -p 8080:8080/tcp --name spotify-app spotify-app:latest 
```

Runs the app in the production mode.\
Open [http://localhost:8080](http://localhost:3042) to view it in the browser.

Or 
```
$ npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.