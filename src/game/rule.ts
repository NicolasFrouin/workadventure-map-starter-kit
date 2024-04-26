export function initRules() {

    let roles = ["mob","player"];
    console.warn("rules init");

    let noteWebsite: any;
    roles.forEach(role => {
        WA.room.area.onEnter(`${role}Area`).subscribe(async () => {
            console.warn(`Reading ${role} rules`);
    
            noteWebsite = await WA.ui.website.open({
                url: `/src/${role}Rules.html`,
                position: {
                    vertical: "top",
                    horizontal: "middle",
                },
                size: {
                    height: "105vh",
                    width: "50vw",
                },
                margin: {
                    top: "0vh",
                },
                allowApi: true,
            });
        });
    
        WA.room.area.onLeave(`${role}Area`).subscribe(() => {
            noteWebsite.close();
        });
    });
    
}