(function($) {

    Samples.Sidebar = function(self, current) {
        return {
            "items" : [
                {
                    "id" : "header-general",
                    "title" : "General",
                    "header" : true
                },
                {
                    "id" : "sidebar-chaining",
                    "link" : "#/components/chaining",
                    "title" : "Chaining",
                    "current" : current ? current == "sidebar-chaining" : false
                },
                {
                    "id" : "sidebar-map",
                    "link" : "#/components/map",
                    "title" : "Map",
                    "current" : current ? current == "sidebar-map" : false
                },
                {
                    "id" : "sidebar-error",
                    "link" : "#/components/error",
                    "title" : "Error Handling",
                    "current" : current ? current == "sidebar-error" : false
                },
                {
                    "id" : "header-components",
                    "title" : "Component",
                    "header" : true
                },
                {
                    "id" : "sidebar-authentication",
                    "link" : "#/components/authentication",
                    "title" : "Authentication",
                    "current" : current ? current == "sidebar-authentication" : false
                },
                {
                    "id" : "sidebar-authorization",
                    "link" : "#/components/authorization",
                    "title" : "Authorization",
                    "current" : current ? current == "sidebar-authorization" : false
                },
                {
                    "id" : "sidebar-team",
                    "link" : "#/components/team",
                    "title" : "Team",
                    "current" : current ? current == "sidebar-team" : false
                },
                {
                    "id" : "sidebar-repository",
                    "link" : "#/components/repository",
                    "title" : "Repository",
                    "current" : current ? current == "sidebar-repository" : false
                },
                {
                    "id" : "sidebar-branch",
                    "link" : "#/components/branch",
                    "title" : "Branch",
                    "current" : current ? current == "sidebar-branch" : false
                },
                {
                    "id" : "sidebar-node",
                    "link" : "#/components/node",
                    "title" : "Node",
                    "current" : current ? current == "sidebar-node" : false,
                    "items" : [
                        {
                            "id" : "sidebar-node-attachment",
                            "link" : "#/components/node-attachment",
                            "title" : "Attachment",
                            "current" : current ? current == "sidebar-node-attachment" : false
                        },
                        {
                            "id" : "sidebar-node-stat",
                            "link" : "#/components/node-stat",
                            "title" : "Statistics",
                            "current" : current ? current == "sidebar-node-stat" : false
                        },
                        {
                            "id" : "sidebar-node-audit",
                            "link" : "#/components/node-audit",
                            "title" : "Audit Record",
                            "current" : current ? current == "sidebar-node-audit" : false
                        },
                        {
                            "id" : "sidebar-node-association",
                            "link" : "#/components/node-association",
                            "title" : "Association",
                            "current" : current ? current == "sidebar-node-association" : false
                        },
                        {
                            "id" : "sidebar-node-feature",
                            "link" : "#/components/node-feature",
                            "title" : "Feature",
                            "current" : current ? current == "sidebar-node-feature" : false
                        },
                        {
                            "id" : "sidebar-node-type",
                            "link" : "#/components/node-type",
                            "title" : "Type",
                            "current" : current ? current == "sidebar-node-type" : false
                        },
                        {
                            "id" : "sidebar-node-form",
                            "link" : "#/components/node-form",
                            "title" : "Form",
                            "current" : current ? current == "sidebar-node-form" : false
                        },
                        {
                            "id" : "sidebar-node-traverse",
                            "link" : "#/components/node-traverse",
                            "title" : "Traverse",
                            "current" : current ? current == "sidebar-node-traverse" : false
                        },
                        {
                            "id" : "sidebar-node-fulltext",
                            "link" : "#/components/node-fulltext",
                            "title" : "Full Text Search",
                            "current" : current ? current == "sidebar-node-fulltext" : false
                        },
                        {
                            "id" : "sidebar-node-folder",
                            "link" : "#/components/node-folder",
                            "title" : "Folder",
                            "current" : current ? current == "sidebar-node-folder" : false
                        }
                    ]
                },

                {
                    "id" : "sidebar-domain",
                    "link" : "#/components/domain",
                    "title" : "Domain",
                    "current" : current ? current == "sidebar-domain" : false,
                    "items" : [
                        {
                            "id" : "sidebar-domain-group",
                            "link" : "#/components/domain-group",
                            "title" : "Group",
                            "current" : current ? current == "sidebar-domain-group" : false
                        },
                        {
                            "id" : "sidebar-domain-user",
                            "link" : "#/components/domain-user",
                            "title" : "User",
                            "current" : current ? current == "sidebar-domain-user" : false
                        }
                    ]
                },
                {
                    "id" : "sidebar-application",
                    "link" : "#/components/application",
                    "title" : "Application",
                    "current" : current ? current == "sidebar-application" : false,
                    "items" : [
                        {
                            "id" : "sidebar-application-setting",
                            "link" : "#/components/application-setting",
                            "title" : "Setting",
                            "current" : current ? current == "sidebar-application-setting" : false
                        }
                    ]
                },
                {
                    "id" : "sidebar-stack",
                    "link" : "#/components/stack",
                    "title" : "Stack",
                    "current" : current ? current == "sidebar-stack" : false
                },
                {
                    "id" : "mini-apps-header",
                    "title" : "Mini App",
                    "header" : true
                },
                {
                    "id" : "mini-apps-fortune-cookie",
                    "link" : "#/mini-apps/fortune-cookie",
                    "title" : "Fortune Cookie",
                    "current" : current ? current == "mini-apps-fortune-cookie" : false
                },
                {
                    "id" : "mini-apps-food-web",
                    "link" : "#/mini-apps/food-web",
                    "title" : "Food Web",
                    "current" : current ? current == "mini-apps-food-web" : false
                },
                {
                    "id" : "mini-apps-social-graph",
                    "link" : "#/mini-apps/social-graph",
                    "title" : "Social Graph",
                    "current" : current ? current == "mini-apps-social-graph" : false
                },
                {
                    "id" : "mini-apps-query-examples",
                    "link" : "#/mini-apps/query-examples",
                    "title" : "Query Examples",
                    "current" : current ? current == "mini-apps-query-examples" : false
                },
                {
                    "id" : "mini-apps-traverse-examples",
                    "link" : "#/mini-apps/traverse-examples",
                    "title" : "Traverse Examples",
                    "current" : current ? current == "mini-apps-traverse-examples" : false
                },
                {
                    "id" : "mini-apps-user-reviews",
                    "link" : "#/mini-apps/user-reviews",
                    "title" : "User Reviews",
                    "current" : current ? current == "mini-apps-user-reviews" : false
                }
            ]
        };
    };

})(jQuery);