# PointAndCylinder


## Problem statement

Problem statement: Using Javascript, please create a function that, given any point and a hollow, closed cylinder, determines the distance from the point to the surface of the cylinder, and a simple GUI to exercise this function. 

You will need to determine how to represent points and cylinders. You can assume Cartesian coordinates and Euclidean geometry. 

## Solution Discusion

### Note on the algorithm

This algorithm is a modification of the distance computation between a point and a cylinder from Barbier & Galin's [Fast Distance Computation Between a Point and Cylinders, Cones, Line Swept Spheres and Cone-Spheres](http://liris.cnrs.fr/Documents/Liris-1297.pdf).

The modifications from the paper are to compute the closest distance when the point is interior to the capped cylinder.

### Inputs

The cylinder's axis is defined by a pair of points: __a__ and __b__.

The cylinder's radius is defined as the number _r_.

We are looking for the shortest distance from a point __p__ to the surface of the closed hollow cylinder.

### Intermediates

The point __c__, is the center point of the line segment [__a__, __b__] and is the center point of the cylinder's axis.

The length of the axis, (or the height of the cylinder), is: _l_ = &#x2016;__b__ - __a__&#x2016;.

We define the unit axis vector, a unit vector in the direction of the axis vector, as: __u__ = (__b__ - __a__)/ &#x2016;__b__ - __a__&#x2016;.

We use the unit axis vector, __u__, to compute the scalar projection of the vector from __c__ to __p__ onto the axis, which is a signed distance along the axis from __c__: _x_ = (__p__ - __c__)&#x2219;__u__.

We further define the coordinate of __p__ orthogonally projected onto the axis as __h__.

The squared distance of __p__ from __c__ is: _n_&#xb2; = &#x2016;__p__ - __c__&#x2016;&#xb2;.

Finally the squared distance from __p__ to the axis is: _y_&#xb2; = &#x2016;__p__ - __h__&#x2016;&#xb2; = _n_&#xb2; - _x_&#xb2;.

### Distance to Cylinder

The points __a__, __b__, and __p__ form a plane within which, because of the symmetry of the cylinder, the problem simplifies down to a straight forward two-dimensional analysis.

We use these computed intermediaries as metrics to seperate the possible arrangements of __p__ and the cylinder and compute the distance to its surface.

The first case is if |_x_| <= (_l_ / 2), and _y_&#xb2; > _r_&#xb2;.

In this case, __h__ is on the line segment [__a__, __b__], on the axis, and __p__ is exterior to the cylinder. The distance to the cylinder is simply: _d_ = _y_ - _r_.

The second case is if |_x_| > (_l_ / 2), which means that __h__ is beyond the ends of [__a__, __b__], and breaks down into two sub-cases.

First, if _y_&#xb2; > _r_&#xb2;, then the distance to the cylinder is the distance to the circle defining the end of the cylinder: _d_ = __SQRT(__(_y_ - _r_)&#xb2; + (|_x_| - (_l_ / 2))&#xb2;__)__.

Second, if _y_&#xb2; < _r_&#xb2;, then the distance to the cylinder is the distance to the cylinder's endcap: _d_ = (|_x_| - _l_/2).

The final case exist if |_x_| < _l_/2, and _y_&#xb2; < _r_&#xb2;. In this case __p__ is interior to the cylinder, and the result is differentiated by whether __p__ is closer to the cylinder's sides, or closer to the cylinder's endcaps. In this case we compute both possibilities and take the minimum: _d_ = __MIN(__ |(_y_ - _r_)|__,__ |(_l_/2 - |_x_|)| __)__.

##  Git Installation and Execution
Checkout this repo, install dependencies, then start the webpack-dev-server process with the following:

```
> git clone https://github.com/bdeansrowe/PointAndCylinder.git
> cd PointAndCylinder
> npm install
> npm start
```
Then open a browser window on 'localhost:9090'
