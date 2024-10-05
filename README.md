<p align="center">

  <!-- ![Cardie Logo](repo/images/logo_light.png#gh-dark-mode-only)
  ![Cardie Logo](repo/images/logo_dark.png#gh-light-mode-only) -->

  ![Hacktoberfest Banner](repo/images/hacktoberfest24.png)

</p>

---

<div align="center">

  [![](https://dcbadge.limes.pink/api/server/G24Ag9FqB8)](https://discord.gg/G24Ag9FqB8)
  [![](https://img.shields.io/github/issues/nfoert/cardie?style=for-the-badge)](https://github.com/nfoert/cardie/issues)
  [![](https://img.shields.io/github/license/nfoert/cardie?style=for-the-badge)](https://github/nfoert/cardie/blob/main/LICENSE)

  **[Live Server](https://cardie-uwtwy.ondigitalocean.app/)**

  **[Wiki](https://github.com/nfoert/cardie/wiki)** |
  **[Releases](https://github.com/nfoert/cardie/releases)**


  **The latest changes are available in the [development](https://github.com/nfoert/cardie/tree/development) branch! Please check there for the most up to date changes.**

</div>

---

Design a unlimited number of business or information cards about yourself, share a link or QR code to them, print it out, and save other people's cards to your virtual wallet for later. Once you've created a card you can get analytics data on how your cards are getting visited, you can edit your cards as things change, and you can keep cards private so only people with a link to your card can see it.

> [!IMPORTANT]
> Cardie is currently in an open alpha. Things will be rapidly changing and bugs are to be expected.

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=django,python,html,css,js,github,git,alpinejs"/>
  </a>
</div>

<div align="center">
  <img src="repo/images/screenshot1.png" style="border-radius: 10px; margin-top: 20px;">
</div>

## Hacktoberfest
Happy Hacktoberfest! I hope that you find this project interesting and that some issues offer a good learning experience! Help of any kind would be greatly appreciated.

- You can check out the [issues page](https://github.com/nfoert/issues) for anything that piques your interest, or you can check the [hacktoberfest tag](https://github.com/nfoert/cardie/issues?q=sort%3Aupdated-desc+is%3Aopen+label%3Ahacktoberfest) for specific issues I've selected for this Hacktoberfest.
- Additionally, please check out [Contributing](#contributing) for some information on how you can contribute to this project.

## Installation

First, clone this repository using the following command
```bash
git clone https://github.com/nfoert/cardie
```

Then, navigate to that directory and create a new python virtual environment
```bash
cd cardie
python3 -m venv .venv
```

Activate the virtual environment using the command for your system (Linux is used here) and install the required dependencies
```bash
source ./.venv/bin/activate
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

Copy the `.env.example` file to a new file called `.env`.
```bash
cp .env-template .env
```

Next, create a django superuser and make and migrate the models
```bash
cd cardie
python manage.py createsuperuser
python manage.py makemigrations
python manage.py migrate
```

Now just run the server using the following command, or run the `Start server` task in your Visual Studio Code
```bash
python manage.py runserver
```

Finally, navigate to `http://127.0.0.1:8000/admin` and log in using your new administrator account. Create a new `Server` object and be sure to configure the `ip` to be `http://127.0.0.1:8000`.

### Additional steps for Production installation
This depends on what server hosting provider you're using. However, there's a couple environment variables you need to set and there's a run command.

Set the following global environment variables:
- `DJANGO_ALLOWED_HOSTS` -> `${APP_DOMAIN}` (This works on DigitalOcean, this may not work on every hosting provider)
- `DJANGO_LOG_LEVEL` -> `WARNING`

- `SECRET_KEY` -> `<your new secret key>` (Generate this using `django.core.management.utils.get_random_secret_key()`. If possible you should encrypt this value in your hosting provider.)
- `DEBUG` -> `False`
- `DATABASE_URL` -> `${db.DATABASE_URL}` (This works on DigitalOcean, this may not work on every hosting provider)

## Development
### djlint
This project uses `djlint` to lint the templates. You can run this using the following command
```bash
djlint cardie --reformat
```
### ruff
This project uses [`ruff`](https://docs.astral.sh/ruff/) to lint and format the code.
You can run the following command to lint and format the code.
```bash
ruff check cardie --fix
```
For VS Code users, you can install the `ruff` extension to get linting and formatting on save.

## Contributing
Please see [CONTRIBUTING.md](CONTRIBUTING.md) for instructions on how you can contribute to Cardie
