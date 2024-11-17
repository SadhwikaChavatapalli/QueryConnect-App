#!/usr/bin/env pwsh

go clean -modcache
go mod tidy
go build