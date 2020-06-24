'use strict';
/* Draws and rotates lissajous curves.
 * -----------------------------------
 * @author:    Caleb Nii Tetteh Tsuru Addy
 * @date:      18th June, 2020 
 * @email:     calebniitettehaddy@gmail.com 
 * @twitter:   @cnttaddy
 * @github :   https://github.com/niitettehtsuru/HarmonicDance
 * @codepen:   https://codepen.io/niitettehtsuru/pen/oNbWQXW
 * @license:   GNU General Public License v3.0 
 */   
/* A lissajous curve is a graph of the following two parametric equations: 
 * 
 * x = Asin(at+?)  --------- (1)
 * y = Bsin(bt)    --------- (2)
 * 
 * In the constructor: 
 *  A is this.relativeWidth
 *  B is this.relativeHeight
 *  a is this.numHorizontalTangents
 *  b is this.numVerticalTangents
 *  ? is this.rotationAngle
 *  t is this.parameter
 */
class Lissajous
{
    constructor(data)
    {          
        this.screenHeight   = data.screenHeight;  
        this.screenWidth    = data.screenWidth; 
        /* The ratio this.relativeWidth/this.relativeHeight determines the relative width-to-height ratio of the curve.  
         * For example, a ratio of 2/1 produces a figure that is twice as wide as it is high.*/
        this.relativeWidth  = data.relativeWidth;//relative width of the curve to the height; 
        this.relativeHeight = data.relativeHeight;//relative height of the curve to the width; 
        /*Visually, the ratio this.numHorizontalTangents/this.numVerticalTangents determines the number of "lobes" of the figure. 
         *For example, a ratio of 3/1 or 1/3 produces a figure with three major lobes.*/ 
        this.numHorizontalTangents = data.numXTan;//number of horizontal tangents(lobes) to the curve 
        this.numVerticalTangents = data.numYTan;//number of vertical tangents(lobes) to the curve 
        /*this.rotationAngle is the phase shift for the lissajous curve. 
         *It determines the apparent "rotation" angle of the figure, viewed as if it were actually a three-dimensional curve.*/ 
        this.rotationAngle = data.rotationAngle;//phase shift 
        this.parameter  = 0;//the parameter, (t) in the parametric equation 
        this.xCoord = data.xCoord;//set x coordinate of the center of the curve  
        this.yCoord = data.yCoord;//set y coordinate of the center of the curve   
        this.step = 629;//controls the drawing of the curve. A step from 0 to 629 draws the curve.   
        this.color =  data.color;//stroke color   
        this.xPrev = 0;   
    }   
    draw()//animates the drawing and rotation of the curve
    {    
        this.parameter = 0;//reset parameter 
        strokeWeight(0.5);
        stroke(this.color);  
        let x1 = 0, y1 = 0;  
        for(let i = 0; i <  this.step;i++) 
        {  
            this.parameter+= 0.01;   
            //Apply Lissajous Parametric Equations
            /*this.xCoord is added to the first equation.
             *this.yCoord is added to the second equation. 
             *This is so the curve is centered at (this.xCoord,this.yCoord) position on the canvas.*/ 
            let x = (this.relativeWidth  * Math.sin(this.numHorizontalTangents*this.parameter + this.rotationAngle))+this.xCoord;//first equation  
            let y = (this.relativeHeight * Math.sin(this.numVerticalTangents*this.parameter) * Math.sin(this.xPrev)) +this.yCoord ;//second equation 
            if(i > 0)
            {
                line(x1,y1,x,y);//draw the curve
            }  
            x1=x; 
            y1=y; 
            this.xPrev = x;  
        }    
        this.rotationAngle += 0.01;//increase rotation angle 
    } 
    resize(screenWidth,screenHeight)
    {   
        if(this.screenHeight !== screenHeight || this.screenWidth !== screenWidth)//if the screen size has changed
        {    
            let dy              = screenHeight/this.screenHeight;//percentage change in browser window height 
            let dx              = screenWidth/this.screenWidth;//percentage change in browser window width  
            this.screenHeight   = screenHeight;  
            this.screenWidth    = screenWidth; 
            this.xCoord *= dx; 
            this.yCoord *= dy;  
            this.relativeWidth *= dx;//relative width of the curve to the height; 
            this.relativeHeight *= dy;//relative height of the curve to the width; 
            if(this.relativeHeight > 200 )
            {  
                this.relativeHeight = 200; 
            }   
            if(this.relativeWidth > 200)
            {
                this.relativeWidth = 200; 
            } 
        } 
    }  
}