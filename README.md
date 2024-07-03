<p align="center">
    <img src="repo/images/logo_light.png" style="border-radius:20px; width:30vw;">
</p>

# Welcome to Cardie!
Design a unlimited number of business or information cards about yourself, share a link or QR code to them, print it out, and save other people's cards to your virtual wallet for later. Once you've created a card you can get analytics data on how your cards are getting visited, you can edit your cards as things change, and you can keep cards private so only people with a link to your card can see it.

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=django,python,html,css,js,github,git,alpinejs"/>
  </a>
</p>

## Installation

> [!IMPORTANT]
> These directions are for a development server only right now. This project is not currently developed enough for production use.


First, clone this repository using the following command
```
git clone https://github.com/nfoert/cardie
```

Then, navigate to that directory and create a new python virtual environment
```
cd cardie
python3 -m venv .venv
```

Activate the virtual environment using the command for your system (Linux is used here) and install the required dependencies
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

Now just run the server using the following command, or run the `Start server` task in your Visual Studio Code
```
python manage.py runserver
```

Finally, navigate to `http://127.0.0.1:8000/admin` and log in using your new administrator account. Create a new `Server` object and be sure to configure the `ip` to be `http://127.0.0.1:8000`.

## To Do
There's lots of things that need implemented or changed in this project. Please see [TODO.md](TODO.md).

## Contributing
I'd love to see contributions to this project! Please check out the [issues](https://github.com/nfoert/issues) page to see what things currently need fixed or added.