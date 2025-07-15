console.log("contact.js loaded");

const form = document.querySelector("form"); //get form element
const successStat = document.querySelector("#successStat"); //get the id successStat

form.onsubmit = (e) => {
    e.preventDefault(); //prevent submission with page reload

    let formData = new FormData(form); //all form inpput data

    let xhr = new XMLHttpRequest(); //new xml object, ajax request
    xhr.open("POST", "php/contact.php", true); //send post request to contact.php file
    
    //when the request finishes succesfully
    xhr.onload = () => { //ajax is loaded
        if (xhr.readyState == 4 && xhr.status == 200) { //if response status = 200 and ready status = 4, then no errors
            let response = xhr.response; //store the server response in variable
            console.log(response);

            if (successStat) {
                successStat.textContent = response;
                successStat.style.color = "green";
            }
            form.reset();
        }
        else {
            if (successStat) {
                successStat.textContent = "error sending message";
                successStat.style.color = "red";
            }
        }
    }
    xhr.send(formData);

    successStat.classList.remove('hidden');
    successStat.textContent = "Message has been sent!";

    setTimeout(() => {
        successStat.textContent = "";
        successStat.classList.add('hidden');
    }, 30000);

    successStat.scrollIntoView({ behavior: 'smooth' });

}