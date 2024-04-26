export function initWinScreen() {
    console.log("Win");
    WA.ui.website.open({
        url: `/src/winningScreen.html`,
        position: {
            vertical: "top",
            horizontal: "middle",
        },
        size: {
            height: "60vh",
            width: "50vw",
        },
        margin: {
            top: "10vh",
        },
        allowApi: true,
    });
}

export function initLoseScreen() {
    console.log("Lose");
    WA.ui.website.open({
        url: `/src/losingScreen.html`,
        position: {
            vertical: "top",
            horizontal: "middle",
        },
        size: {
            height: "60vh",
            width: "50vw",
        },
        margin: {
            top: "10vh",
        },
        allowApi: true,
    });
}