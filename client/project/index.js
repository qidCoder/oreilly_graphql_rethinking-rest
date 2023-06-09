const fullStar = "★";
const emptyStar = "☆";

const commitFragment = `
fragment commitFragment on Repository {
  master: ref(qualifiedName: "master") {
    target {
      ... on Commit {
        history {
          totalCount
        }
      }
    }
  }
  main: ref(qualifiedName: "main") {
    target {
      ... on Commit {
        history {
          totalCount
        }
      }
    }
  }
}
`;

const queryRepoList =
    `query ($userName: String!){
        user (login: $userName) {
            name
            repositories (first: 12){
                totalCount
                nodes{
                    name
                }
            }
        }
    }`
;

let mutationAddStar;

let mutationRemoveStar;

function gqlRequest(query, variables, onSuccess) {
  // MAKE GRAPHQL REQUEST
    $.post({
        url: "https://api.github.com/graphql",
        ContentType: "application/json",
        headers: {Authorization: `bearer ${env.GITHUB_PERSONAL_ACCESS_TOKEN}`},
        data: JSON.stringify({
            query: query,
            variables: variables
        }),
        success: (response) => {
            console.log(response);
            if (response.errors){
                console.log(response.errors)
            }
            else {
                onSuccess(response.data)
                console.log(response.data)
            }
        },
        error: (error) => {
            console.log(error);
        }
    })
}

function starHandler(element) {
  // STAR OR UNSTAR REPO BASED ON ELEMENT STATE

}

$(window).ready(function() {
  // GET NAME AND REPOSITORIES FOR VIEWER
    gqlRequest(
        queryRepoList,
        {userName: "qidCoder"},
        (data) => {
            $('h2').text(`hello ${data.user.name}`);
        }
    );

});
