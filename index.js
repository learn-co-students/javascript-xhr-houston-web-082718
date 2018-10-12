// function getRepositories() {
//     const req = new XMLHttpRequest();
//     req.open("GET", "https://api.github.com/users/octocat/repos");
//     req.send();
// }

function showRepositories(event, data) {
    //this is set to the XMLHttpRequest object that fired the event
    // console.log(this.responseText);

    //listing the repository names
    // let repoList = "<ul>";
    // for (var i = 0; i < this.responseText.length; i++) {
    //   repoList += "<li>" + this.responseText[i]["name"] + "</li>";
    // }
    // repoList += "</ul>";
    //BUT responseText is just a string of text
    
    //tell the interpreter that we're working with JSON is to parse it with JSON.parse
    var repos = JSON.parse(this.responseText);
    console.log(repos);
    // const repoList = `<ul>${repos.map(r => "<li>" + r.name + "</li>").join("")}</ul>`;

    //list the commits for any given repository
    //need an element to click for each repository on our page that will request that 
    //repository's commits. So we'll need to add a "Get Commits" link to our output in 
    //showRepositories, make a new XHR request when that link is clicked, and then 
    //show the commits in the second column.
    const repoList = `<ul>${repos.map(r => "<li>" + r.name 
        + ' - <a href="#" data-repo="' + r.name 
        //we're using a data attribute to hold the repo name. Data attributes make it 
        //super easy to pass data around between DOM elements and JS
        + '" onclick="getCommits(this)">Get Commits</a></li>')
        //onclick is explicitly passing this to the getCommits function to make sure that 
        //the current element (the link being clicked) is available to our getCommits function
        .join("")}</ul>`;

    document.getElementById("repositories").innerHTML = repoList;
    
}

function getRepositories() {
    const req = new XMLHttpRequest();
    //defining an event listener on the request to listen for the load event, which will tell us 
    //that the request is complete. We'll give this listener a callback function, which is simply 
    //a function that will get called when the event fires.
    req.addEventListener("load", showRepositories);
    req.open("GET", "https://api.github.com/users/octocat/repos");
    req.send();
}

function getCommits(el) {
    const name = el.dataset.repo; //grab that data-repo value through the dataset property
    const req = new XMLHttpRequest();
    req.addEventListener("load", showCommits);
    req.open("GET", "https://api.github.com/repos/octocat/" + name + "/commits");
    req.send();
}

function showCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits.map(commit => "<li><strong>" 
        + commit.commit.author.name + "</strong> - " + commit.commit.message + "</li>")
    .join("")}</ul>`;
document.getElementById("commits").innerHTML = commitsList;
}