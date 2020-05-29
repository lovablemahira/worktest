import json
import string
import numpy as np
import matplotlib.pyplot as plt


# How to run: Windows| Type "python Challenge2.py" in the command prompt (assuming python and libraries are installed)
# This program takes in json data, converts it into an array and list, and smoothes it
# I chose a conventional smoothing method given the type of data and its values

# Converting json
with open("region.json", "r") as content:
	jsonData = content.read()
data = jsonData[jsonData.find('['):-1]
data = np.array(eval(data.replace(']]', ']],')))

# Make numpy print 4 significant digits for prettiness
np.set_printoptions(precision=4, suppress=True)
#np.random.seed(5) # To get predictable random numbers
n_points = len(data[0])
x_vals = []
y_vals = []

for i in data[0]:
	x_vals.append(i[0])
	y_vals.append(i[1])

# Setup for data smoothing
def sigma2fwhm(sigma):
	return sigma * np.sqrt(8 * np.log(2))
def fwhm2sigma(fwhm):
	return fwhm / np.sqrt(8 * np.log(2))

FWHM = 4
sigma = fwhm2sigma(FWHM)

smoothed_vals = np.zeros(np.array(y_vals).shape)

# Smoothing the data and altering values accordingly
for x_position in x_vals:
	kernel = np.exp(-(x_vals - x_position) ** 2 / (2 * sigma ** 2))
	kernel = kernel / sum(kernel)
	smoothed_vals[np.where(x_vals == x_position)] = sum(y_vals * kernel)

plt.bar(x_vals, smoothed_vals)
plt.show()
