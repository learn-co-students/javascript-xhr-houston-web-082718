//----> callback function that displays api get request in console and parses data to DOM
function showRepositories(event, data) {
		let repos = JSON.parse(this.responseText)
		console.log(repos)
		const repoList = `<ul>${repos.map(repo =>
			`<li>${repo.name}- <a href='#' data-repo='${repo.name}' onclick='getCommits(this)'>Get Commits</a></li>`
		).join("")}</ul>`
    document.getElementById("repositories").innerHTML = repoList
}

//----> fetch function that grabs public api info from github user
function getRepositories() {
    const req = new XMLHttpRequest()
    req.addEventListener("load", showRepositories)
    req.open("GET", "https://api.github.com/users/octocat/repos")
    req.send()
}

//----> get request to specific github repo
function getCommits(showRepo) {
	const name = showRepo.dataset.repo
	const req = new XMLHttpRequest()
	req.addEventListener("load", showCommits)
	req.open("get", `https://api.github.com/repos/octocat/${name}/commits` )
	req.send()
}

//----> show function that parses commits and displays them to the DOM
function showCommits() {
	const commits = JSON.parse(this.responseText)
	const commitsList = `<ul>${commits.map(commit =>
		`<li><strong>${commit.commit.author.name}</strong> - ${commit.commit.message}</li>`
	).join("")}</ul>`
	document.getElementById("commits").innerHTML = commitsList
}
