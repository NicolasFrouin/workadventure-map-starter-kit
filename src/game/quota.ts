import { initWinScreen } from "./screens";

export async function initQuota() {  
    if (!WA.state.quota || isNaN(WA.state.total)) {
        WA.state.saveVariable("quota", 420);
    }
    console.log(`Current quota : ${WA.state.quota} `);
    WA.state.onVariableChange("total").subscribe(total => {
        if (total >= WA.state.quota) {
            initWinScreen();
        }  
    })
    return WA.state.quota;
}

export const gameQuota = initQuota();
