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
Ce tutoriel à été conçu pour un système d'exploitation linux, j'ai utilisé Ubuntu, mais plusieurs distributions devraient fonctionner.
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
![](./GraphQLPlayground.png)
En cliquant sur le bouton schéma à droite on peut voir la documentation de l'API, elle affiche tous les opérations et types de notre schéma GraphQL.

On peut envoyer une requête de la manière suivante:
```graphQL
query {
	info
}
```
Cette requête devrait envoyer Le string que nous avons défini dans le resolver.

### Explication des schémas
Le centre d'un API GraphQL est son schéma. Le schéma est ce qui décrit tous les types données et comment ces données interagissent entre elles. Le schéma défini aussi quelles données on peut aller chercher avec les requêtes et quelles données on peut modifier avec les mutations. Les schémas sont écrit en SDL(Schema Definition Language) qui ressemble un peu Json.

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

On ne fait qu'ajouter un attribut à Query qui va retourner un liste de Livre, cette liste ne sera jamais null et ne contiendera jamais d'élément null(les 2 !). Ensuite on crée notre nouveau type Livre qui a un id et un titre. L'id du livre est d'un type spécial ID.

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

### Un mot sur les resolvers
Comme vous l'avez surement remarqué, on a implémenté des resolvers mais on a jamais expliqué ce qu'ils faisaient. Les résolvers servent à transformer les opérations GraphQL(Query, Mutation, Subscription) en données. Une fonction resolver à toujours la forme suivante:
```JavaScript
nomAttribut: (parent, args, context, info) => data;
```
parent est le résultat de l'exécution du resolver du niveau précédent. Rappelez vous les requête sont sur plusieurs niveaux qui sont entre brackets{}.
args est l'objet qui contient les arguments qu'on passe dans l'attribut, on verra un exemple d'utilisation plus tard.
context est un objet qui est partagé par tous les resolvers, on peut l'utiliser pour faire de authentification d'utilisateur pour contrôler qui a accès à quelle données.
info contient de l'information sur l'état de l'exécution de l'opération qui devrait seulement être utilisé dans des cas avancés.

### Ajout d'une mutation
Nous allons maintenant ajouter une mutation dans notre API GraphQL, on pourra ajouter de nouveaux livres sur le serveur.
Comme auparavant, on commence par modifier le schéma GraphQL:
```
const typeDefs = `
type Query {
	info: String!
	bibliotheque: [Livre!]!
}

type Mutation {
	ajouterLivre(titre: String!): Livre!
}

type Livre {
	id: ID!
	titre: String!
}
`
```
On peut voir que la définition du schéma pourrait devenir très grande avec le temps, on peut donc mettre notre schéma dans un fichier séparément. On crée un nouveau fichier à partir de la racine du projet:
```
touch src/schema.graphql
```
Ensuite on ne fait que copier le contenu de la définition du schéma dans le nouveau fichier:
```
type Query {
	info: String!
	bibliotheque: [Livre!]!
}

type Mutation {
	ajouterLivre(titre: String!): Livre!
}

type Livre {
	id: ID!
	titre: String!
}
```
En faisait cela, nous n'avons plus besoin de la constante typeDefs dans index.js, on peut donc la supprimer. À la place, on va changer la façon d'instancier le server dans le bas de index.js:
```
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
```
On ne fait que dire au serveur que la définition du schéma est dans le fichier localiser à ./src/schema.graphql.

Après avoir modifier le schéma, on doit implémenter le resolver de la nouvelle mutation.:
```JavaScript
let livres = [{
  id: '0',
  titre: "GraphQL pour les nuls"
}]
let idLivre = livres.length
const resolvers = {
  Query: {
    info: () => `Ceci est l'API d'une bibliothèque`,
    bibliotheque: () => livres,
  },
  Mutation: {
    ajouterLivre: (parent, args) => {
       const livre = {
        id: `${idLivre++}`,
        titre: args.titre
      }
      livres.push(livre)
      return livre
    }
  },
}
```
Premièrement, on peut remarquer qu'on a retirer les resolvers pour les attributs du type Livre. Cette implémentation était triviale et le serveur n'en a pas besoin pour fonctionner, il peut le faire lui-même(On explique plus en détail plus bas).

On a ajouter un compteur pour générer des id unique pour chaque livre. ce compteur est incrémenter à chaque livre qui est ajouté à la liste.

On a aussi ajouter le resolver de la requête ajouterLivre qui fait partie du type Mutation. Le resolver crée un nouveau livre et ajoute ces attributs qu'on a passer en paramètre de la requête(args) pour ensuite ajouter le nouveau livre à la liste de livres.

On retourne le livre crée pour confirmer au client que le livre a bien été créé.

On peut maintenant tester notre nouvelle mutation, on a seulement besoin d'arrêter et repartir le serveur et se diriger sur GraphQl Playground. On peut ensuite lancer cette requête pour ajouter un livre à la liste:
```
mutation {
	ajouterLivre(
		titre: "Le Seigneur des Anneaux"
		) {
			id
		}
}
```
On devrait reçevoir un réponse qui ressemble à cela:
```
{
	"data": {
		"ajouterLivre": {
			"id": "1"
		}
	}
}
```
À chaque fois que l'on ajoute un livre l'id devrait s'incrémenter.
Pour vérifier que notre livre à bien été ajouter on peut refaire la même requête qu'auparavant pour aller chercher tous les livres(bibliotheque. Par contre, à chaque fois que l'on ferme le serveur, les données seront perdus. La prochaine section montrera comment mettre en place une base de données pour garder les livres.

### Exécution des requêtes
Je vais maintenant vous expliquer comment interagissent les différentes couches des resolvers et les requêtes.
![](./executionRequete.png)
Voici un schéma illustrant les différentes étapes du serveur lors d'une requête d'un client.

1.La requête arrive dans le serveur sous sa forme originale.

2.Le serveur invoque le resolver qui est associé à l'attribut bibliotheque du type Query. Dans cet exemple on assume que la liste de livre ne contient qu'un seul livre, le serveur retourne donc le livre présent dans la liste.

3.Ensuite, le serveur invoque le resolver pour l'attribut id de Livre. Le parent contient alors la valeur de retour du resolver de la couche supérieur, parent contient {"id": "1", "titre": "Le Seigneur des Anneaux"}. Le serveur n'a seulement besoin que de retourner parent.id.

4.On fait la même chose que pour la troisième étape sauf qu'on retourne parent.titre. Il est a noté que les étapes 3 et 4 peuvent être exécutés en parallèle.

5.Le processus de résolution est terminé. Le serveur met donc le résultat sous la forme standard de GraphQL.

On voit qu'on peut omettre les resolvers quand ils sont triviaux comme livre.id et livre.titre car le serveur n'en as pas besoin. C'est pour cela qu'on les a retiré plus tôt dans le tutoriel.

### Ajout d'une base de données
Nous allons maintenant mettre en place un base de données pour pouvoir sauvegarder nos livres. J'ai choisi d'utiliser mongoDB pour sa simplicité. Pour simplifier encore plus les choses nous allons utiliser un fournisseur de base de données: [mlab.com](mlab.com). En s'inscrivant sur mlab, on obtient accès à une base de données mongoDB gratuitement et assez d'espace pour ce tutoriel. 

Avant de mettre en place la base de données, on doit ajouter une dépendance au projet: mongoose. Mongoose sert à faire le lien entre le code et la base de données afin de ne pas avoir à écrire des requêtes directement à la base de données. Ouvrez un terminal à partir de la racine du projet et entrez:
```
yarn add mongoose
```
Cela ajoutera mongoose à notre projet.

Pour mettre la bd en place, vous pouvez commencer par vous rendre sur le site web de mlab pour ensuite vous créer un compte. Ensuite, on vous demandera de choisir votre plan, on prend gratuit. Après on doit choisir la région, prenez celle par défaut. On doit ensuite attendre l'allocation de la base de données. 

Quand le chargement est terminé, cliquez sur Database Access dans le menu à gauche et ensuite sur add new user à droite. Choisissez un nom d'utilisateur ainsi qu'un mot de passe et donnez les privilèges d'écriture et de lecture à l'utilisateur. Pour finir cliquez sur add user.

Après, on peut cliquez sur Network Access dans le menu à gauche et ensuite sur add ip address. Vous pouvez entrer l'adresse ip 0.0.0.0/0 pour donnez accès à n'importe laquel adresse ou bien votre propre addresse ip, libre à vous. Cliquez su confirm pour confirmer

Nous sommes prêt à nous connecter, cliquez sur Clusters dans le menu à gauche et ensuite sur connect dans Cluster0. Dans la nouvelle fenêtre, cliquez sur Connect Your Application et ensuite copier le string de connection qui est fourni.

On peut maintenant ajouter ce code dans le haut de index.js qui permettera à notre api de se connecter à la base de données:
```JavaScript
const mongoose = require('mongoose')
const db = mongoose.connect('mongodb+srv://username:password@cluster0-n4u4h.mongodb.net/test?retryWrites=true&w=majority')
const Schema = mongoose.Schema
const schemaLivre = new Schema({
	titre: {type: String}
	})
const Livre = mongoose.model('livre', schemaLivre)
```
note:remplacer username et password dans le string de connection par ceux que vous avez créé auparavant.

Ce code se connecte à la bd et ensuite on défini la forme des données qui seront stocker dans la bd. Nous aurons seulement besoin d'interagir avec Livre pour accèder aux données de la bd.

On doit ensuite modifier nos resolvers pour qu'il prennent les données de la bd à la place de ceux de la liste en mémoire:
```JavaScript
const resolvers = {
	Query: {
		info: () => `Ceci est l'API d'une bibliotheque`,
		bibliotheque: () => Livre.find({}),
	},
	Mutation: {
		ajouterLivre: async (parent, args) => {
			const livre = new Livre({
				titre: args.titre
			})
			const error = await livre.save()

			if(error) return error
			return livre
		}
	}
}
```
On commence par modifier la requête bibliotheque pour qu'elle retourne tous les livre qui font partie de la bd.

Ensuite on modifie ajouterLivre pour qu'elle ajoute le livre à la bd et on met aussi une gestion d'erreur.

Pour finir on peut supprimer la liste de livres qui est en mémoire et la variable qui permettait de garder le compte de livre pour générer les ids. Les ids sont généré automatiquement avec notre configuration.

On peut maintenant aller tester nos modification et vérifier si nos données sont conservées. Dirigez-vous sur GraphQL Playground et entrer la mutation suivante:
```
mutation {
	ajouterLivre(titre:"Harry Potter") {
		id
		titre
	}
}
```
Cela devrait vous retourner le livre avec son id généré automatiquement. Si on exécute la requête bibliotheque, ce nouveau livre devrait être afficher. 

Les données sont maintenant persistées, donc si vous redémarrer le serveur, elles seront toujours là! Essayez pour voir.

## Conclusion
Dans ce tutoriel, vous avez appris à contruire un serveur GraphQL à partir de rien du tout en utilisant Node.js, graphql-yoga et un base de données mangoDB avec Mongoose. Il y a beaucoup d'aspects de GraphQL que nous n'avons pas explorer, comme les Subscriptions, la pagination, le triage, le filtrage et plusieurs autres. 

Vous êtes maintenant capable de constuire un serveur GraphQL en n'importe lequel language de programmation et moyen de stocker les données(cela nécessitera un peu de recherche pour trouver les bon outils).

Pour plus d'information et de tutoriels sur GraphQL, vous pouvez vous rendre sur le [site officiel](graphql.org).

### Références
[How to GraphQL - graphQL node tutorial](howtographql.com/graphql-js/0-introduction/)

[Apollo GraphQL - tutorial](https://www.apollographql.com/docs/tutorial/introduction/)

[GraphQL Server Basics](https://www.prisma.io/blog/graphql-server-basics-the-schema-ac5e2950214e)

[Playing with GraphQL yoga and mongoose](https://dev.to/aurelkurtula/playing-with-graphql-yoga-and-mongoose-f4f)

[Building a RESTful API with Express and MongoDB - Working with mongoDB](https://dev.to/aurelkurtula/building-a-restful-api-with-express-and-mongodb--3mmh)
