const loadScript = (url, storage) => {

    const $ = (selector) => document.querySelector(selector);
    const btnReload = $(".reload-btn");
    const body = $(".body");
    // const noPage = $(".no-page");

    const URL = url;
    const STORAGE = storage

    // body.classList.toggle("no-render", true);
    // noPage.classList.toggle("no-render", false);

    // METODOS
    // Recarga la page
    const handleReload = () => {
        window.location.reload();
    };
    // Busca en el storage y renderiza informacion
    const handleStorage = () => {
        const storageData = JSON.parse(STORAGE);

        if (!!storageData) {        
            const user = JSON.parse(storageData.user);
            $("#nameUser").innerText = user?.name || "usuario";
            $("#crmID").innerText = user?.partner_id || "N/A";
            $("#repoID").innerText = user?.repo_id || "N/A";
            $("#faID").innerText = user?.fa_id || "N/A";
            $("#ondemandID").innerText = user?.ondemand_id || "N/A";
            $("#participantID").innerText = user?.od_participant_id?.id || "N/A";
            $("#sisID").innerText = user?.sis_id || "N/A";
        } else {
            console.log("ADENdev no puede detectar el storage");
        }
    };

    // EVENTS
    // Checkea la informacion
    const conditionURL = URL.includes('app.aden') || URL.includes('acropolislab.com')
    if (conditionURL) {
        // noPage.classList.toggle("no-render", true);
        body.classList.toggle("no-render", false);
        handleStorage();
    }
    // Recarga la pagina
    btnReload.addEventListener("click", handleReload);
};

// Conecto al worker
const channel = new BroadcastChannel("background-popup");
channel.onmessage = (msg) => {
    // Seteo la informacion al script
    const URL_BASE = JSON.parse(msg?.data?.msg).url
    const STORAGE = JSON.parse(JSON.parse(msg?.data?.msg).storage)['persist:campus-auth']
    console.log("Ejecuto");
    loadScript(URL_BASE, STORAGE);
};
channel.postMessage({ msg: "worker from popup" });
