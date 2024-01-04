=========================
Django Bootstrap Template
=========================
This template can be used to build a custom version of Bootstrap 5 for
stying your Django templates. It is intended to be used with Django sites
created using the `django-project-template`_.

.. _django-project-template:  https://github.com/StuartMacKay/django-project-template

Features
--------
* Configured with `Bootstrap 5: <https://getbootstrap.com/docs/5.0/getting-started/introduction/>`_
* Built with `Webpack 5: <https://webpack.js.org/>`_

Prerequisites
-------------
You will need to install `node.js`_. If you have several projects then
`Node Version Manager`_ will make your life a lot easier.

.. _node.js: https://nodejs.org/en/download
.. _Node Version Manager: https://github.com/nvm-sh/nvm

How To Use
----------
Check out the repository to the ``frontend`` directory of your project:

..  code-block:: shell

    git clone git@github.com:StuartMacKay/django-bootstrap-template.git frontend

Next, build the assets:

..  code-block:: shell

    cd frontend
    nvm use
    npm install
    npm run build

The Bootstrap files, and favicon images are written to the ```frontend/dist```
directory, where Django will find them. See the STATICFILES_DIRS setting.

If you are likely to be making frequent changes to the bootstrap files then
you can have webpack compile everything automatically whenever any of the scss
or js files are changed, by running:

..  code-block:: shell

    npm run watch

The Django site will pick up the changes whenever the page is loaded or refreshed.
