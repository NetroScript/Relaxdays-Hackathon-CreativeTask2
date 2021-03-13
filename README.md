# Relaydays-Hackathon-CreativeTask1

This project was created in the Relaxdays Code Challenge Vol. 1. 
See sites.google.com/relaxdays.de/hackathon-relaxdays/startseite for more information.
My participant ID in the challenge was: CC-VOL1-23

## GeschenkeInspirator

This is an app (website) to suggest gift ideas to the user.
It is built using TypeScript, Vue and Nuxt.
Because it was created during a Hackathon the code might not always be optimal.

**You can find a demo video for the application [here](https://cloud.enostrion.com/index.php/s/ZaHKFFS9beYQrEq).**   

## Build Setup - No Docker

The following steps assume you have NodeJS with Yarn installed.

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Build Setup - Docker

Get a running version of this code using the following commands:

```bash
git clone https://github.com/NetroScript/Relaydays-Hackathon-CreativeTask1.git
cd Relaydays-Hackathon-CreativeTask1
docker build -t geschenkeinspirator .
docker run -v $(pwd)/content:/usr/src/app/content -p 3000:3000 -it geschenkeinspirator
```

or if you have docker compose

```bash
git clone https://github.com/NetroScript/Relaydays-Hackathon-CreativeTask1.git
cd Relaydays-Hackathon-CreativeTask1
docker-compose up
```

## Creating own Gift ideas

The content directory allows you to set up your own sample gift ideas.
The currently used format is YAML, but also JSON would be supported. (See the [NUXT Content docs](https://content.nuxtjs.org/) for more info on formats)

For the content to refresh you need to restart the server.

An example file would look like this:

```YAML
---
name: Rosenstrauß # Name of the gift
internalID: rosenstrauß # Which internal ID (/slug) is used
details: Das klassische Geschenk für den Muttertag. Mit einen Rosenstrauß kann man
  nichts falsch machen und macht jeden Empfänger glücklich. # A description of the product
vorschauBilder: # A list of images
  - https://loremflickr.com/800/400/rose,flower/all
  - https://loremflickr.com/800/400/roses
anlass: # Event for which the gifts fit
  - Muttertag
preis: 5.0 # Price in €
empfaengerAlter: 30-44 # One of the age groups, refer to the Enum to know the possible values
verfeinerung: Weiblich # Gender
verhaeltnis: Mutter # Relationship, refer to the type definitions for the other values
beliebtheit: 5 # Rating from 0-5
anzahlBewertungen: 100 # How many ratings
attribute: # Attributes of the gift
  lustig: 0.0 # funny
  romantisch: 0.8 # romantic
  edel: 0.0 # noble
  besonders: 0.0 # special
  nuetzlich: 0.2 # useful
tags: # a list of possible tags
  - Blumen
  - Strauß
  - Mutter
```

For the exact types take a look at the `Geschenk` Interface in `/model/General.ts`.

