(function() {
    if (typeof Samples === "undefined") {
        /** @namespace */
        Samples = {};
    }

    if (typeof Samples.Components === "undefined") {
        Samples.Components = {};
    }

    if (typeof Samples.Pages === "undefined") {
        Samples.Pages = {};
    }

    if (typeof Samples.Utils === "undefined") {
        Samples.Utils = {};
    }

    if (typeof Samples.Utils.D3 === "undefined") {
        Samples.Utils.D3 = {};
    }

    Samples.defaultClient = function() {
        var language = window.navigator.userLanguage || window.navigator.language;
        var userLocale = language.replace('-','_');
        var gitana = new Gitana({
            "clientId": "676e3450-6131-46c2-99cc-496aa2ad80fa",
            "clientSecret": "5fGkvesH/tWEMX6SpevL54rY6iJK5ADzLH963sif2ljrWvFOhV2zXv6rSpLF2uMWlJ9SG0uEO9uQO4JZac0i7DZquA/5W8ixJwhj76g0Ksk=",
            "locale" : userLocale
        });

        return gitana.authenticate({
            "username": "demo",
            "password": "demo"
        });
    };

    Samples.defaultErrorHandler = function(error, divId) {
        $('#' + divId + '-error').addClass('alert alert-error').empty().html(error.message);
    };

    Samples.init = function() {
        Samples.defaultClient().then(function() {

            var platform = this.getPlatform();

            this.queryRepositories({
                "sdk_bundle": "sdk-sample-repository"
            }).count(function(count) {
                    if (count == 0) {
                        this.subchain(platform).createRepository({
                            "title" : "Sample Repository",
                            "sdk_bundle": "sdk-sample-repository"
                        }).then(function() {
                                Samples.sampleRepository = this.getId();
                            });
                    } else {
                        this.keepOne().then(function() {
                            Samples.sampleRepository = this.getId();
                        })
                    }
                });

            this.queryApplications({
                "sdk_bundle": "sdk-sample-application"
            }).count(function(count) {
                    if (count == 0) {
                        this.subchain(platform).createApplication({
                            "title" : "Sample Application",
                            "sdk_bundle": "sdk-sample-application"
                        }).then(function() {
                                Samples.sampleApplication = this.getId();
                            });
                    } else {
                        this.keepOne().then(function() {
                            Samples.sampleApplication = this.getId();
                        })
                    }
                });

            this.readPrimaryDomain().trap(
                function() {
                    this.createUser({
                        'name' : 'testuser'
                    }).then(function() {
                            Samples.sampleUser = this;
                        });
                }).readPrincipal('testuser').then(function() {
                    Samples.sampleUser = this;
                    Samples.sampleUserId = this.getDomainQualifiedId();
                });

            this.queryStacks({
                "sdk_bundle": "sdk-sample-stack"
            }).count(function(count) {
                    if (count == 0) {
                        this.subchain(platform).createStack({
                            "title" : "Sample Stack",
                            "sdk_bundle": "sdk-sample-stack"
                        }).then(function() {
                                Samples.sampleStack = this.getId();
                            });
                    } else {
                        this.keepOne().then(function() {
                            Samples.sampleStack = this.getId();
                        })
                    }
                });

            this.queryAuthenticationGrants({
                "clientId" : "676e3450-6131-46c2-99cc-496aa2ad80fa"
            }).count(function(count) {
                    if (count == 0) {
                        this.subchain(platform).then(function() {

                            var authInfo = this.getDriver().getAuthInfo();

                            this.createAuthenticationGrant({
                                "title": "Sample Authentication Grant for Default Client",
                                "clientId": "676e3450-6131-46c2-99cc-496aa2ad80fa",
                                "enabled": true,
                                "allowOpenDriverAuthentication": true,
                                "principalDomainId": authInfo.getPrincipalDomainId(),
                                "principalId": authInfo.getPrincipalId()
                            }).then(function() {
                                    Samples.sampleAuthenticationGrant = this;
                                });
                        });
                    } else {
                        this.keepOne().then(function() {
                            Samples.sampleAuthenticationGrant = this;
                        })
                    }
                });

            this.queryClients({
                "title": "Sample Open Driver Client"
            }).count(
                function(count) {
                    if (count == 0) {
                        this.subchain(platform).createClient({
                            "title": "Sample Open Driver Client",
                            "authorizedGrantTypes": [
                                "authorization_code",
                                "client_credentials",
                                "implicit",
                                "password",
                                "refresh_token"
                            ],
                            "scope": [
                                "api"
                            ],
                            "allowOpenDriverAuthentication": true,
                            "domainUrls": [
                                "http://code.cloudcms.com"
                            ],
                            "enabled": true
                        }).then(function() {
                                Samples.sampleOpenDriverClient = this;
                            });
                    } else {
                        this.keepOne().then(function() {
                            Samples.sampleOpenDriverClient = this;
                        })
                    }
                }).then(function() {
                    this.subchain(platform).queryAuthenticationGrants({
                        "clientId" : Samples.sampleOpenDriverClient.get('key')
                    }).count(function(count) {
                            if (count == 0) {
                                this.subchain(platform).then(function() {

                                    var authInfo = this.getDriver().getAuthInfo();

                                    this.createAuthenticationGrant({
                                        "title": "Sample Authentication Grant for the Open Driver Client",
                                        "clientId": Samples.sampleOpenDriverClient.get('key'),
                                        "enabled": true,
                                        "allowOpenDriverAuthentication": true,
                                        "principalDomainId": authInfo.getPrincipalDomainId(),
                                        "principalId": authInfo.getPrincipalId()
                                    }).then(function() {
                                            Samples.sampleOpenDriverAuthenticationGrant = this;
                                        });
                                });
                            } else {
                                this.keepOne().then(function() {
                                    Samples.sampleOpenDriverAuthenticationGrant = this;
                                })
                            }
                        });
                });

        });
    };

    Samples.init();

    Samples.AlpacaConnector = new Alpaca.Connectors.GitanaConnector('gitana', {
        "gitanaContext" : Gitana.Context.create({
            "driver": {
                "clientId": "676e3450-6131-46c2-99cc-496aa2ad80fa",
                "clientSecret": "5fGkvesH/tWEMX6SpevL54rY6iJK5ADzLH963sif2ljrWvFOhV2zXv6rSpLF2uMWlJ9SG0uEO9uQO4JZac0i7DZquA/5W8ixJwhj76g0Ksk="
            },
            "authentication": {
                "username": "demo",
                "password": "demo"
            },
            "repository": {
                "title": "Store Content"
            },
            "error" : function(error) {

            }
        })
    });
})();    