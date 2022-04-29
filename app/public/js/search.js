let searchbar = document.getElementById("searchbar");

searchbar.addEventListener('keyup', (e) => {
    let searchText = e.target.value;

    if (searchText !== "") {

        let response = fetch('apps', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ payload: searchText })
        }).then(response => response.json()).then(data => console.log(data.payload))
    }
})