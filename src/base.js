/* Sets everything up
 * ------------------
 * @author:    Caleb Nii Tetteh Tsuru Addy
 * @date:      18th June, 2020 
 * @email:     calebniitettehaddy@gmail.com 
 * @twitter:   @cnttaddy
 * @github :   https://github.com/niitettehtsuru/HarmonicDance
 * @codepen:   https://codepen.io/niitettehtsuru/pen/oNbWQXW
 * @license:   GNU General Public License v3.0 
 */ 
let curve;
function getBrowserWindowSize()//get the width and height of the browser window 
{
    let win = window,
    doc = document,
    offset = 20,//
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    browserWindowWidth = win.innerWidth || docElem.clientWidth || body.clientWidth,
    browserWindowHeight = win.innerHeight|| docElem.clientHeight|| body.clientHeight;  
    return {width:browserWindowWidth-offset,height:browserWindowHeight-offset}; 
} 
function onWindowResize()//called every time the window gets resized. 
{  
    let browserWindowSize = getBrowserWindowSize(); 
    resizeCanvas(browserWindowSize.width,browserWindowSize.height); 
    //let curve respond to window resizing
    curve.resize(browserWindowSize.width,browserWindowSize.height); 
}
window.addEventListener('resize',onWindowResize);
//gets the relative height and relative width of the curve, assuming that the the window was in 
//fullscreen mode and is now reduced to it's present dimensions
function getCurveDimensions(inputRelativeWidth,inputRelativeHeight)
{
    let fullScreenWidth = 1346;//assumed browser window width of device
    let fullScreenHeight = 644;//assumed browser window height of device 
    let dy  = height/fullScreenHeight;//percentage change in browser window height 
    let dx  = width/fullScreenWidth;//percentage change in browser window width  
    let relativeWidth = inputRelativeWidth * dx; 
    let relativeHeight = inputRelativeHeight * dy; 
    return {w:relativeWidth,h:relativeHeight};   
}
function createCurve(screenWidth,screenHeight)
{ 
    let 
    curve,   
    //position the curve at the center of the canvas
    xCoord = screenWidth/2,//x-coordinate of curve center  
    yCoord = screenHeight/2,//y-coordinate of curve center 
    numHorizontalTangents = 1.5,//number of horizontal tangents(lobes) to the curve 
    numVerticalTangents = 1.5,//number of vertical tangents(lobes) to the curve 
    relativeWidth  = 200,//default relative width of the curve to the height
    relativeHeight = 200;//default relative height of the curve to the width  
    
    let dimensions = getCurveDimensions(relativeWidth,relativeHeight) ;
    let data = 
    {         
        relativeWidth: dimensions.w, 
        relativeHeight:dimensions.h, 
        numXTan:numHorizontalTangents,
        numYTan:numVerticalTangents,
        rotationAngle: -Math.PI , 
        xCoord: xCoord,
        yCoord: yCoord, 
        screenWidth: screenWidth,
        screenHeight: screenHeight,
        color: 'white'
    };
    curve = new Lissajous(data);  
    return curve;  
}
 