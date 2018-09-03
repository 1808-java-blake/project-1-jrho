
function showReimb(reimb){
    const tbdoy = document.getElementById('reimb-result')
    let resolver = 0;
    if(reimb.resolver===0){
        resolver = "TBA";
    }else{
        resolver = reimb.resolver;
    }

    tobdy.innerHTML +=`
    <tr>
        <th scope="row">${reimb.id}</th>
            <td>${reimb.amount} </td>
    `


}