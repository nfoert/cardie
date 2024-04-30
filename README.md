<p align="center">
    <img src="repo/images/logo_light.png" style="border-radius:20px; width:30vw;">
</p>

# Welcome to Cardie!
Design a unlimited number of buisness or information cards about yourself, share a link or QR code to them, print it out, and save other people's cards to your virtual wallet for later. Once you've created a card you can get analytics data on how your cards are getting visited, you can edit your cards as things change, and you can keep cards private so only people with a link to your card can see it.

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=django,python,html,css,js,github,git"/>
  </a>
</p>

## Installation

> [!IMPORTANT]
> These directions are for a develeopment server only right now. This project is not currently developed enough for production use.


First, clone this repository using the following command
```
git clone https://github.com/nfoert/cardie
```

Then, navigate to that directory and create a new python virtual enviroment
```
cd cardie
python3 -m venv .venv
```

Activate the virtual enviroment using the command for your system (Linux is used here) and install the required dependencies
```
source ./.venv/bin/activate
pip install -r requirements.txt
```

Next, create a django superuser and make and migrate the models
```
cd cardie
python manage.py createsuperuser
python manage.py makemigrations
python manage.py migrate
```

You should be done! Now just run the server using the following command, or run the `Start server` task in your Visual Studio Code
```
python manage.py runserver
```

## To Do
There's lots of basic things that need done before this project can truly begin. Here's a rough todo list of the main things that still need completed.

- [x] Logo design
- [x] Basic django project up and running
- [x] Design UI elements
- [x] Basic home page
- [x] Authentication system
  - [x] User model
  - [x] Sign in and create account views
  - [x] Functional authentication pages and browser persistence
- [ ] Card design
  - [ ] Basic home page design
  - [ ] Card models
  - [ ] Card UI element
  - [ ] Basic card customization
- [ ] Card sharing
  - [ ] Link generation
  - [ ] QR code generation
  - [ ] Card printing
  - [ ] Save to wallet
- [ ] Ability to log out

## Contributing
I'd love to see contributions to this project! However, there's not enough development on it yet to warrant contributions. Once progress is made and beta releases start going out, I'll organize more to prepare for contributions.