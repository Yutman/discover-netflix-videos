

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(
    "https://peaceful-unicorn-27.hasura.app/v1/graphql",
    {
      method: "POST",
      headers: {
        'x-hasura-admin-secret':
        'wZ5g69IamXbUH01rqF95V83q8yKUDN7jN0huwMBwDPJQMAPUmBELOkn401fYJc3j',
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
} 

const operationsDoc = `
  query MyQuery {
    users {
      id
      email
      issuer
      publicAddress
    }
  }
`;

function fetchMyQuery() {
  return fetchGraphQL(
    operationsDoc,
    "MyQuery",
    {}
  );
}

export async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}

