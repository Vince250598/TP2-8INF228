# GraphQL Tutorial
## Introduction

GraphQL est un language de requêtes pour les interfaces de programmation d'application (API) et une façon d'exécuter pour remplir ces requêtes avec des données existantes. GraphQL permet d'exposer la description des données des APIs d'une façon qui est facile à lire et qui rend facile le développement des APIs dans le temps.

GraphQL n'est pas lier à une base de données spécifique ou à un moteur de stockage mais est soutenu par le code et les données déjà existantes. 

Un service GraphQL est créé en définissant des types et des attributs sur chacun de ces types. Ensuite, on défini des fonctions pour chaque attribut de chaque type.

Lorsqu'un service GraphQL est en fonction, on peut lui envoyer des requêtes. Lorsqu'une requête est reçu par le serveur, elle est vérifié pour s'assurer qu'elle ne réfère que les attributs et types définis et ensuite le serveur appel les fonctions fournis pour produire un résultat.

Il y a plusieurs type de requêtes, premièrement les Query, pour aller trouver de l'information. Ensuite les Mutations, pour ajouter, modifier ou supprimer de des données. Il y a aussi les Subscriptions, elles servent à notifier un client lorsqu'une certaine action est effectuer ou lorsqu'une données est ajouter ou modifier. Ces trois types sont des types appelés racine, ils sont les trois opérations offerts par GraphQL. Ces types définissent les opérations disponibles.

Ce qui est bien avec le GraphQL, c'est qu'on reçois seulement ce que l'on demande et pas plus, ce qui permet de créer des applications légère qui génère moins de trafique. 

## Objectifs du tutoriel
L'objetif de ce tutoriel est de vous apprendre à créer un serveur qui utilise GraphQL. Après ce tutoriel, vous aurez une bonne base pour bien comprendre l'utilité et bien implémenter GraphQL dans n'importe quelle application. Nous créérons un serveur en JavaScript qui simule la gestion d'une bibliothèque.

## Tutoriel
Pour commencer, quelques technologies doivent être déjà installées sur votre ordinateur, nous utiliserons ces technologies pour rendre notre expérience plus simple. Les technologies sont les suivantes:
- Yarn, pour gérer les dépendances du projet
- Node.js, pour exécuter le code Javascript du serveur

### Le Commencement
On commence par ouvrir le terminal on se crée un répertoire pour y placer notre projet et on utilise yarn init pour créer un fichier de configuration pour Node dans celui-ci à l'aide des commandes suivantes.
```
mkdir tutoriel-graphql
cd tutoriel-graphql
yarn init -y
```
On peut ensuite créer un nouveau répertoire src qui contiendera le code source de l'application. On ajoute également le fichier index.js qui sera le coeur de l'application. On utilise les commandes suivantes:
```
mkdir src
touche src/index.js
```
