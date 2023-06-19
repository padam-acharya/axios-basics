const url = 'https://jsonplaceholder.typicode.com/todos?limit=20'

// GET REQUEST

function getTodos() {
    // axios({
    //     method: "GET",
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     params: {
    //         _limit: 5
    //     }
    // })
    //     .then(res => showOutput(res))
    //     .catch(err => console.log(err))
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
        .then(res => showOutput(res))
        .catch(err => console.log(err))
}

// POST REQUEST
function addTodo() {
    // axios({
    //     method: "POST",
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     data: {
    //         title: 'New Todo',
    //         completed: false
    //     }
    // })
    //     .then(res => showOutput(res))
    //     .catch(err => console.log(err))




    axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: 'New Completed Todo',
        completed: true
    }, config)
        .then(res => showOutput(res))
        .catch(err => console.log(err))

}

// put vs patch 
// put is meant to replace the entire resource
// patch will update it incrementally. In other words patch will just overwrite the properties that we specified in the second arguement

// PUT/PATCH REQUEST
function updateTodo() {
    axios.patch('https://jsonplaceholder.typicode.com/todos/1', {
        title: 'Updated Todo',
        completed: true
    })
        .then(res => showOutput(res))
        .catch(err => console.log(err))
}

// DELETE REQUEST
function removeTodo() {
    axios.delete('https://jsonplaceholder.typicode.com/todos/1')
        .then(res => showOutput(res))
        .catch(err => console.log(err))
}

// SIMULTANEOUS DATA
function getData() {
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5'),

    ])
        .then(axios.spread((todos, posts) => {
            showOutput(posts)
        }))
        .catch(err => console.log(err))
}

// CUSTOM HEADERS

function customHeaders() {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: 'sometoken'
        }
    }

    axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: 'New Completed Todo',
        completed: true
    }, config)
        .then(res => showOutput(res))
        .catch(err => console.log(err))

}


// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
    console.log('Transform Response');
}

// ERROR HANDLING
function errorHandling() {
    console.log('Error Handling');
}

// CANCEL TOKEN
function cancelToken() {
    console.log('Cancel Token');
}

// INTERCEPTING REQUESTS & RESPONSES

axios.interceptors.request.use(config => {
    console.log(`${config.method.toUpperCase()} request send to ${config.url} at ${new Date().getTime()}`)
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.request.use(config => {
    // Modify the request config or add headers
    config.headers.Authorization = 'Bearer token123';
    config.headers.Accept = 'application/xml';
    return config;
}, error => {
    // Handle request errors
    return Promise.reject(error);
});

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
    document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);