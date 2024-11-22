package models

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	uri = "mongodb://localhost:27017/"
)

func getClientConnection(context context.Context) (*mongo.Client, error) {
	client, err := mongo.Connect(context, options.Client().ApplyURI(uri))

	return client, err
}

func getModelCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	// client, err := mongo.NewClient(options.Client().ApplyURI(uri))
	// err = client.Connect(context)

	collection := client.Database("EurusDB").Collection(collectionName)
	return collection
}
