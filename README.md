# GraphQL Tutorial
## Introduction

GraphQL est un language de requêtes pour les interfaces de programmation d'application (API) et une façon d'exécuter pour remplir ces requêtes avec des données existantes. GraphQL permet d'exposer la description des données des APIs d'une façon qui est facile à lire et qui rend facile le développement des APIs dans le temps.

GraphQL n'est pas lier à une base de données spécifique ou à un moteur de stockage mais est soutenu par le code et les données déjà existantes. 

Un service GraphQL est créé en définissant des types et des attributs sur chacun de ces types. Ensuite, on défini des fonctions pour chaque attribut de chaque type.

Lorsqu'un service GraphQL est en fonction, on peut lui envoyer des requêtes. Lorsqu'une requête est reçu par le serveur, elle est vérifié pour s'assurer qu'elle ne réfère que les attributs et types définis et ensuite le serveur appel les fonctions fournis pour produire un résultat.

Il y a plusieurs type de requêtes, premièrement les Query, pour aller trouver de l'information. Ensuite les Mutations, pour ajouter, modifier ou supprimer de des données. Il y a aussi les Subscriptions, elles servent à notifier un client lorsqu'une certaine action est effectuer ou lorsqu'une données est ajouter ou modifier.

Ce qui est bien avec le GraphQL, c'est qu'on reçois seulement ce que l'on demande et pas plus, ce qui permet de créer des applications légère qui génère moins de trafique. 

## Objectifs du tutoriel
L'objetif de ce tutoriel est de vous apprendre à créer un serveur qui utilise GraphQL. Après ce tutoriel, vous aurez une bonne base pour implémenter GraphQL dans n'importe quelle application.

## partie 1
