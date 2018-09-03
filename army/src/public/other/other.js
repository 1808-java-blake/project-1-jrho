
function applyReimb(event) {
    event.preventDefault();
    let finished = 0;




    const amount = document.getElementById('input-amount').value;
    const desciption = document.getElementById('input-description').textContent;
    const type = document.getElementById('input-type').value;
    const auth = JSON.parse(localStorage.getItem('user')).username;
    const password = JSON.parse(localStorage.getItem('user')).password;

    const reimb = {
        amount,
        desciption,
        type,
        auth,
        password
    };

    fetch('../reimb', {

        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reimb)
    })

        .then(resp => resp.json())
        .then(resp => {
            window.location = 'http://localhost:9001/home/home.html'
        })
        .catch(err => {
            console.log(err);
        });


}

function doSwal() {
    swal({
        title: "Confirmation",
        text: "Are You Sure?",
        buttons: {
            cancel: true,
            confirm: "Submit"
        }

    })
        .then(val => {
            if (val) {
                swal({
                    title: "Thank you",
                    text: "You've applied reimbursement",
                    icon: "success"
                });

            }
            return true;
        });

    return false;



}//end doSwal()
