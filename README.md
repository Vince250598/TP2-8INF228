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
On commence par ouvrir le terminal on se crée un répertoire pour y placer notre projet et on utilise yarn init pour créer un fichier de configuration pour Node à l'aide des commandes suivantes.
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
On pourrait exécuter le serveur maintenant mais il ne ferait rien, on passe donc à la prochaine étape. On ajoute une dépendance au projet à l'aide de la commande suivante:
```
yarn add graphql-yoga
```
[graphql-yoga](https://github.com/prisma-labs/graphql-yoga) est un serveur complet qui est basé sur Express.js et quelques autres librairies, cette dépendance nous simplifiera grandement la tâche.

Nous sommes maintenant prêt à commencer l'implémentation de notre bibliothèque!
Vous pouvez aller dans votre éditeur de code préféré et ajouter le code suivant dans index.js:
```JavaScript
const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
type Query {
  info: String!
}
`

const resolvers = {
  Query: {
    info: () => `Ceci est l'API d'une bibliothèque`
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
```
explications du code:
la première ligne sert à importer la dépendance à graphql-yoga dans notre index.js.

La constante typeDefs défini notre schéma GraphQL. Dans notre cas, on ne fait que définir un type Query qui contient un attribut qui s'appelle info. Cet attribut retourne le type String, le ! à la droite signifie que cet attribut ne peut jamais être null.

L'objet resolvers lui est l'implémentation de notre schéma GraphQL, il possède la même structure que le schéma lui-même.

Finalement, on passe le schéma et les resolvers au server afin qu'il puisse savoir quels opérations sont acceptés et comment elles soivent êtres résolues.

On peut maintenant tester notre serveur GraphQL en utilisant cette commande à partir du répertoire racine du projet:
```
node src/index.js
```
Comme mentionné dans la fenêtre de commande, le serveur est sur localhost:4000, pour tester notre API on n'a qu'a naviguer sur localhost:4000 à l'aide d'un navigateur. On arrive sur le GraphQL Playground, un "application" qui permet de tester des APIs GraphQL de façon interactive.
!(GraphQLPlayground.png)
En cliquant sur le bouton schéma à droite on peut voir la documentation de l'API, elle affiche tous les opérations et types de notre schéma GraphQL.

On peut envoyer une requête de la manière suivante:
```graphQL
query {
	info
}
```
Cette requête devrait envoyer Le string que nous avons défini dans le resolver.

### Explication des schémas
Le centre d'un API GraphQl est son schéma. Le schéma est ce qui décrit tous les types données et comment ces données interagissent entre elles. Le schéma défini aussi quelles données on peut aller chercher avec les requêtes et quelles données on peut modifier avec les mutations. Les schémas sont écrit en SDL(Schema Definition Language) qui ressemble un peu Json.

Chaque Schéma GraphQL possède trois types dit "racine", ce sont les suivants: Query, Mutation et Subscription. Ils correspondent aux opérations offertes par GraphQL. Dans notre cas, nous avons seulement un attribut dans le type Query(info), quand on envoie des requêtes à un API, elles doivent toujours commencer dans un type racine.

### Ajouter un attribut au type Query
On va maintenant implémenter une requête pour avoir tous les livres faisant partie de la bibliothèque.

On commence par ajouter notre nouvelle requête au schéma ainsi qu'un nouveau type: Livre.
à chaque fois que l'on veut ajouter une nouvelle fonctionnalité à l'API, le processus est presque toujours le même: agrandir le schéma avec la nouvelle requête et ensuite implémenter le resolver correspondant.
Ce processus est appelé développement par schéma.

on commence par ajouter la requête bibliotheque au type Query et ensuite on crée le type Livre dans index.js:
```JavaScript
const typeDefs = `
type Query {
	info: String!
	bibliotheque: [Livre!]!
}

type Livre {
	id: ID!
	titre: String!
}
`
```

On ne fait qu'ajouter un attribut à Query qui va retourner un liste de Livre, cette liste ne sera jamais null et ne contiendera jamais d'élément null(les 2 !). Ensuite on crée notre nouveau type Livre qui a un id et un titre.

La prochaine étape est d'implémenter un resolver pour la requête bibliotheque de cette façon:
```JavaScript
let livres = [{
	id: '0',
	titre: 'GraphQL pour les nuls'
}]

const resolvers = {
	Query: {
		info() => `Ceci est l'API d'une bibliothèque`,
		bibliotheque: () => livres,
	},

	Livre: {
		id: (parent) => parent.id,
		titre: (parent) => parent.titre
	}
}
```
les premières lignes servent à garder les livres en mémoire, pour l'instant nous n'avons pas encore de base de données.

Ensuite on ajoute la requête bibliotheque à resolvers, on lui fait retourner la liste de livres défini plus haut.

Ensuite on défini les resolvers pour les attributs de Livre, nous verrons à quoi sert le paramètre parent bientôt.

On peut maintenant aller tester notre API en arrêtant et redémarrant le serveur(ctrl-c et node src/index.js encore) et en allant au localhost:4000.

si on envoie cette requête, on devrait recevoir la liste de livre en réponse:
```
query {
	bibliotheque {
		id
		titre
	}
}
```
On peut aussi retirer des attributs de la requête si l'on veut, par exemple cette requête fonctionnerais:
```
query {
	bibliotheque {
		titre
	}
}
```
On ne reçois que les titre des livres à la place de toutes l'information.
C'est ce qui fait la puissance de graphQl, on ne reçois ce que l'on demande et on diminue donc le trafique sur le réseau. Par contre, on doit obligatoirement avoir au moins 1 attribut dans notre requête.

### La mot sur les resolvers
Comme vous l'avez surement remarqué, on a implémenté des resolvers mais on a jamais expliqué ce qu'ils faisaient. Les résolvers servent à transformer les opérations GraphQL(Query, Mutation, Subscription) en données. Une fonction resolver à toujours la forme suivante:
```JavaScript
nomAttribut: (parent, args, context, info) => data;
```
parent est le résultat de l'exécution du resolver du niveau précédent. Rappelez vous les requête sont sur plusieurs niveaux qui sont entre brackets{}.
args est l'objet qui contient les arguments qu'on passe dans l'attribut, on verra un exemple d'utilisation plus tard.
context est un objet qui est partagé par tous les resolvers, on peut l'utiliser pour faire de authentification d'utilisateur pour contrôler qui a accès à quelle données.
info contient de l'information sur l'état de l'exécution de l'opération qui devrait seulement être utilisé dans des cas avancés.

### Ajout d'une mutation






### Exécution des requêtes