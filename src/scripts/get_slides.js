async function getSlides(slideStart, slideLimit) {
    let res = await fetch(`http://localhost:3000/slides?_start=${slideStart}&_limit=${slideLimit}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        return;
    }

    let json = await res.json();
    return json;

};