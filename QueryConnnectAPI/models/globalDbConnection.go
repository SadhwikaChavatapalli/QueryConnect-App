package models

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	uri = "mongodb://localhost:27017/"
)

func getModelCollection(context context.Context, collectionName string) (*mongo.Collection, error) {
	client, err := mongo.NewClient(options.Client().ApplyURI(uri))

	if err != nil {
		fmt.Printf("Error connecting to DB! - %s", err.Error())
	}

	err = client.Connect(context)

	collection := client.Database("EurusDB").Collection(collectionName)
	return collection, err
}
