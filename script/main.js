const issuesContainer = document.getElementById("issues-container")
let allIssuesData = [];
async function allIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json()
    allIssuesData = data.data;
    showIssues(allIssuesData);
};
function filterIssues(status) {
    if (status === "all") {
        showIssues(allIssuesData);
        return;
    }

    const filtered = allIssuesData.filter(issue => issue.status.toLowerCase() === status);
    showIssues(filtered);

}
function showIssues(issues) {
    issuesContainer.innerHTML = ``;
    issues.forEach(issue => {
        const div = document.createElement("div")
        div.className = "border p-4 rounded-lg mb-2 bg-red-700";
        div.innerHTML = `
            <h3 class="font-bold">${issue.title}</h3>
        <p>Status: ${issue.status}</p>
            `;
        issuesContainer.appendChild(div)
    });


};




allIssues()
filterIssues()