#include <stdio.h>
#include <math.h>

/*
To run: Windows| If everything is installed correctly and the paths are set, then
type "gcc Challenge1.c", then type "gcc -o Challenge1 Challenge1.c", finally type
"Challenge1" and it should run

This program aquires a linear distance via the user input. It then takes that
distance and determines the angle of the wheel by calling the "linearDistX" and
printing the result. Inside the "linearDistX" function, basic trigonometry is
done using the values given in the provided image to determine the theta angle.
The result will produce values from about -pi/4 to pi/4 (-45 to 45 degrees) indicating
which way the wheel is turning (left or right).
*/

float findSteeringAngle(float linearDistX) {
    //--Variables--
    float theta;
    
    //--Code--
    // (7,3)x
    //      | \ y = (7/3)x
    //      |___\ <-(0,0)
    // Slope changes when x does
    // Find the new slope by figuring out its relationship with the sides
    // x = sqrt(58) - 5 in th beginning
    theta = acos((linearDistX / 5.0)) - (M_PI / 2); //-45 to 45 degrees
    
    return theta;
}

int main()
{
    //--Variables--
    float linearDistX;
    
    //--Code--
    //Gets number for calculation
    printf("Hi! Please enter the linear distance: ");
    scanf("%f", &linearDistX);
    
    //Printing result
    printf("Great! Here's the angle of the wheel: %f(radians)", findSteeringAngle(linearDistX));

    return 0;
}


