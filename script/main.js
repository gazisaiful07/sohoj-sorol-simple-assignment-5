const issuesContainer = document.getElementById("issues-container")
const openCount = document.getElementById("open-count");
const closedCount = document.getElementById("closed-count");
const totalIssues = document.getElementById("total-issues");
const issuesModal = document.getElementById("my_modal_5");
const modalTitle = document.getElementById ("modal-tittle");
const modalStatus = document.getElementById ("status");
// const modalDate = document.getElementById ("updatedAt");
const modalDescription = document.getElementById ("description");
const modalPriority = document.getElementById("priority")



let allIssuesData = [];
async function allIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json()
    allIssuesData = data.data;


    updateStatus();
    showIssues(allIssuesData);
};

function setActiveButton(status) {

    document.getElementById("btn-all").classList.remove("btn-primary");
    document.getElementById("btn-open").classList.remove("btn-primary");
    document.getElementById("btn-closed").classList.remove("btn-primary");

    document.getElementById("btn-all").classList.add("btn-outline");
    document.getElementById("btn-open").classList.add("btn-outline");
    document.getElementById("btn-closed").classList.add("btn-outline");

    document.getElementById(`btn-${status}`).classList.remove("btn-outline");
    document.getElementById(`btn-${status}`).classList.add("btn-primary");
}

function updateStatus() {
    totalIssues.innerText = `${allIssuesData.length} Issues`;
}
function filterIssues(status) {
    setActiveButton(status)
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
        const card = document.createElement("div")
        const isOpen = issue.status.toLowerCase() === "open";
        card.className = card.className = `bg-white rounded-xl shadow-sm border border-blue-50 bg-white overflow-hidden  
                        ${isOpen ? "border-t-4 border-t-green-500" : "border-t-4 border-t-purple-500 border"}`;
        card.innerHTML = `
                <div class="p-5">
                <div class="flex justify-between items-center mb-4 ">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm 
                        ${isOpen ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"}">
                        ${isOpen ? "<image src=./assets/Open-Status.png>" : '<i class="fa-solid fa-circle-check"></i>'}
                    </div>

                    <span class="px-4 py-1 rounded-full text-sm font-medium
                        ${issue.priority?.toLowerCase() === "high"
                ? "bg-red-100 text-red-500"
                : issue.priority?.toLowerCase() === "medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-100 text-gray-500"
            }">
                        ${issue.priority || "LOW"}
                    </span>
                </div>

                <h3 class="text-2xl font-semibold mb-3 leading-snug cursor-pointer" onclick="openModalissue('${issue.id}')">${issue.title}
                </h3>

                <p class="text-gray-500 mb-4 line-clamp-2">
                    ${issue.description}
                </p>

                <div class="flex flex-wrap gap-2 mb-5">
                    ${(issue.labels)
                .map(
                    label => `
                            <span class="px-3 py-1 rounded-full text-sm border
                                ${label.toLowerCase().includes("bug")
                            ? "bg-red-50 text-red-500 border-red-200"
                            : "bg-yellow-50 text-yellow-600 border-yellow-300"
                        }">
                                ${label}
                            </span>
                        `
                )
                .join("")}
                </div>
            </div>

            <div class="border-t-3  border-gray-100 px-5 py-4 text-gray-500">
                <p>#${issue.id} by ${issue.author}</p>
                <p class="mt-1">${issue.createdAt}</p>
            </div>
                `;
        issuesContainer.appendChild(card)
    });


};



async function openModalissue(issueId) {
    console.log(issueId, "issue");
    const res = await fetch (`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
    const data =await res.json();
    issuesModal.showModal();
    console.log(data,'data')
    const issue = data?.data
    modalTitle.textContent= issue.title;
    // modalDate.textContent = 
}



allIssues()

