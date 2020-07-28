function openMonitorDesignPage() {
    if (!plcComInProcess) {
        console.log("openMonitorDesign");
        window.location.href = 'pageMonitorDesign.html';
    }
}