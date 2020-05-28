#include <stdio.h>
#include <math.h>

/*
To run: Since this is a simple program, I'd recommend copying and pasting this code into https://www.onlinegdb.com/

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
    //cos(0)=adj/hyp
    theta = acos((linearDistX / 5.0)) - (M_PI / 4); //-45 to 45 degrees
    
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


