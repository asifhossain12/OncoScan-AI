# To create color spaces like RGB, HSV, Gray Scale.

import cv2
import matplotlib.pyplot as plt


image = cv2.imread('sam_1.jpg')

gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

plt.figure(figsize=(10, 5))

plt.subplot(1, 3, 1)
plt.title("Grayscale Image")
plt.imshow(gray_image, cmap='gray') # {Color map}  cmap='gray' is generally used to represent img in actual grayscale.
plt.axis('off')


plt.subplot(1, 3, 2)
plt.title("HSV Image")
plt.imshow(hsv_image)
plt.axis('off')

plt.subplot(1, 3, 3)
plt.title("Original Image")
plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))  # Convert BGR to RGB for proper display
plt.axis('off')


plt.show()