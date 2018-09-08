function getAllUsers() {
    fetch(`../reimb`)
        .then(resp => resp.json())
        .then(resp => {
            document.getElementById('reimb-result').innerHTML = '';
            resp.forEach(reimb => {
                userResult(reimb);
            })
        }).catch(err => {
            console.log(err);
        })

}
getAllUsers();


// function userResult(reimb) {
//     const tbody = document.getElementById('reimb-result');

//     let resolver = 0;
//     if (reimb.resolver === 0) {
//         resolver = "TBA";
//     }
//     else {
//         resolver = reimb.resolver;
//     }

//     let str = "";
//     if (reimb.status == 3) {
//         str = `select onchange="getStatus(${reimb.id});`
//     }

//     let gear = `<i class="fa fa-gear" style="font-size:36px, pointer;"></i>`;
//     tbody.innerHTML +=
//         `<tr>
//         <th scope="row">${reimb.id}</th>
//         <td> $${reimb.amount} </td>
//         <td>${reimb.submitted.slice(0, 10)}</td>
//         <td>${reimb.description}</td>
//         <td>${reimb.type}</td>
//         <td>${reimb.author}</td>
//         <td>${resolver}</td>
//         <td>${reimb.resolved.slice(0, 10)}</td>
//         <td>${reimb.status}</td>
//         <td id="td-admin-option" class="collapsible">${gear}</td>
//         <div class ="content">
//             <p>admin options</p>
//         </div>
//     </tr>
//     `
// }//end userResult(reimb);


function userResult(reimb) {
    const tbody = document.getElementById('reimb-result');

    let resolver = 0;
    if (reimb.resolver === 0) {
        resolver = "TBA";
    }
    else {
        resolver = reimb.resolver;
    }

    let str = "";
    if (reimb.status == 3) {
        str = `select onchange="getStatus(${reimb.id});`
    }

    let gear = `<i class="fa fa-gear" style="font-size:36px, pointer;"></i>`;
    tbody.innerHTML +=
        `<tr>
        <th scope="row">${reimb.id}</th>
        <td> $${reimb.amount} </td>
        <td>${reimb.submitted.slice(0, 10)}</td>
        <td>${reimb.description}</td>
        <td>${reimb.type}</td>
        <td>${reimb.author}</td>
        <td>${resolver}</td>
        <td>${reimb.resolved.slice(0, 10)}</td>
        <td>${reimb.status}</td>
        <td id="td-admin-option">${gear}
            <div>
                <button class="btn btn-primary" onclick="toApprove(${reimb.id})">Approve</button>
                <button class="btn btn-primary" onclick="toDeny(${reimb.id})">Deny</button>
            </div>
            </td>
    </tr>
    `
}//end userResult(reimb);

// function getCollapsible(){
//     let coll = document.getElementsByClassName('collapsible')
//     console.log(coll.length);
//     let i;
//     for (i = 0; i < coll.length; i++) {
//         console.log('here');
//         coll[i].addEventListener("click", function() {
//           console.log('got here')
//           this.classList.toggle("active");
//           let content = this.nextElementSibling;
//           console.log(content);
//           if (content.style.display === "block") {
//             content.style.display = "none";
//           } else {
//             content.style.display = "block";
//           }
//         });
//       }
// }
// document.addEventListener("DOMContentLoaded",function(event){
//     getCollapsible();
// });

function showAdminMenu(reimb) {
    document.getElementById("td-admin-option").innerHTML = `hello`;
    userResult(reimb);
}


function getStatus(id) {
    let table = document.getElementById('reimb-result')
    let tags = table.getElementsByTagName("td");
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].innerText == id) {
            let th = tags[i].parentElement.getElementsByTagName("th")[0];
            let val = th.getElementsByTagName("select")[0].value;
            if (val == 1) {
                toApprove(id);
            }
            else if (val == 2) {
                toDeny(id);
            }
        }
    }
}

function toApprove(id) {
    fetch(`../reimb/approve/${id}`, {
        method: 'PUT',
        body: localStorage.getItem('user')
    })
        .then(resp => resp.json())
        .then(resp => {
            window.location = 'http://localhost:9001/admin/admin.html'
        })
        .catch(err => {
            console.log(err);
        });

}
function toDeny(id) {
    fetch(`../reimb/deny/${id}`, {
        method: 'PUT'
    })
        .then(resp => resp.json())
        .then(resp => {
            window.location = 'http://localhost:9001/admin/admin.html'
        })
        .catch(err => {
            console.log(err);
        });
}

function viewUsers() {
    let num = document.getElementById('admin-select-option').value;

    if (num == "0") {
        getAllUsers();
    }
    else {
        getUserByStatus(num);
    }
}


function findUserId(){
    let num =document.getElementById('get-user-by-id').value;
    findUser(num);

}

function findUser(id){
    fetch(`../reimb/users/${id}`,{
        method:'GET'
    })
        .then(resp => resp.json())
        .then(resp => {
            document.getElementById('reimb-result').innerHTML = '';
            resp.forEach(reimb => {
                userResult(reimb);
            })
        }).catch(err => {
            console.log(err);
        })

}




function getUserByStatus(num) {
    fetch(`../reimb/status/${num}`, {
        method: 'GET'
    })
        .then(resp => resp.json())
        .then(resp => {
            document.getElementById('reimb-result').innerHTML = '';
            resp.forEach(reimb => {
                userResult(reimb);
            })
        }).catch(err => {
            console.log(err);
        });
}

