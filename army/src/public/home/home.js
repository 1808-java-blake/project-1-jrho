
function showReimb(reimb){
    const tbody = document.getElementById('reimb-result')
    let resolver = 0;
    if(reimb.resolver===0){
        resolver = "TBA";
    }else{
        resolver = reimb.resolver;
    }

    

    tbody.innerHTML +=`
    <tr>
        <th scope="row">${reimb.id}</th>
            <td> $${reimb.amount} </td>
            <td>${reimb.submitted.slice(0,10)}</td>
            <td>${reimb.description}</td>
            <td>${reimb.type}</td>
            <td>${reimb.author}</td>
            <td>${resolver}</td>
            <td>${reimb.resolved.slice(0,10)}</td>
            <td>${reimb.status}</td>
    </tr>
    `

}

let user = JSON.parse(localStorage.getItem('user'));

console.log(user.id);

fetch(`../reimb/users/${user.id}`)
    .then(resp=>resp.json())
    .then(resp=>{
        resp.forEach(reimb=>{
            showReimb(reimb);
        })
    })
    .catch(err=>{
        console.log(err);
    });

