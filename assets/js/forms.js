// console.log("form.js loaded");

const forms = document.querySelectorAll("form"); //get all form elements

forms.forEach((form) => {
    const successStat = form.querySelector(".success-message"); //get the .success-message element within the form

    form.onsubmit = (e) => {
        e.preventDefault(); //prevent submission with page reload

        let formData = new FormData(form); //all form input data

        let xhr = new XMLHttpRequest(); //new xml object, ajax request
        xhr.open("POST", form.getAttribute('action'), true); //send post request to the file specified in the form's action
        
        //when the request finishes successfully
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
                    successStat.textContent = "Error sending message";
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
});
