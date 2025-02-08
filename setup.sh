#!/bin/bash

# Zainstaluj zależności APT
sudo apt update
sudo apt install -y build-essential python3-dev libldap2-dev libsasl2-dev python3-django nodejs npm
sudo npm install -g @angular/cli jwt-decode
cd angular_app
ng add @angular/material