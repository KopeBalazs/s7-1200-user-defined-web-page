
var menuMonitorElements;
var monitorWindow;
var monitorDesignMenu;
var adapterJSON;
var saveElementsBtn;
var resetElementsBtn;
var monitorViewBtn;
var monitorDesignBtn;
var postJson;
var plcComInProcess;
var loadDiv;
const sizeOfElementsArray = 10;
const sizeOfPlcData = 10;
const plcIP = '192.168.2.14';
//Save the constant ratio between the element wheight and width
const elementHeightWidthRatio = 15 / 31;

const monitorWindowWidth = 80;
const monitorWindowHeight = 35;
const headerMenuHeight = 5;
const monitorDesignToViewRatio = 1.2125;
const padding = 1.5;
const resizeOffsetError = 3;