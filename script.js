async function getUsers() {

    const count = document.getElementById("userCount").value;
    const userContainer = document.getElementById("userContainer");
    const message = document.getElementById("message");
    const button = document.getElementById("generateBtn");

    if (count < 1 || count > 50 || !Number.isInteger(Number(count))) {
        message.innerText = "Please enter a number between 1 and 50";
        return;
    }

    userContainer.innerHTML = "";
    message.innerText = "Loading Users...";
    button.disabled = true;

    try {

        const response = await fetch(
            `https://randomuser.me/api/?results=${count}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        data.results.forEach(user => {

            const fullName = `${user.name.first} ${user.name.last}`;

            userContainer.innerHTML += `
                <div class="col-md-4 col-sm-6 mb-3">
                    <div class="card user-card shadow">

                        <img src="${user.picture.large}" alt="Profile Picture">

                        <h5>${fullName}</h5>

                        <p>Email: ${user.email}</p>

                        <p>Place: ${user.location.city},
                        ${user.location.country}</p>

                        <p>phone no: ${user.phone}</p>

                    </div>
                </div>
            `;

        });

        message.innerText = `${data.results.length} Users Generated Successfully!`;

    } catch (error) {

        message.innerText = "Something went wrong. Please try again.";
        console.error(error);

    } finally {

        button.disabled = false;

    }
}