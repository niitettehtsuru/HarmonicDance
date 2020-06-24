/* Initialise the animation
 * ------------------------
 * @author:    Caleb Nii Tetteh Tsuru Addy
 * @date:      18th June, 2020 
 * @email:     calebniitettehaddy@gmail.com 
 * @twitter:   @cnttaddy
 * @github :   https://github.com/niitettehtsuru/HarmonicDance
 * @codepen:   https://codepen.io/niitettehtsuru/pen/oNbWQXW
 * @license:   GNU General Public License v3.0 
 */ 
function setup() 
{
    let browserWindowSize = getBrowserWindowSize();  
    createCanvas(browserWindowSize.width,browserWindowSize.height);  
    curve = createCurve(width,height); 
    smooth(); 
    background(0);   
} 
function draw() 
{     
    background(0); 
    curve.draw();  
}