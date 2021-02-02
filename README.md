# sliding_puzzle
Frontend sliding puzzle game

## Use Case Description(first draft)

1. Input an image file, which will be used as the background image for the puzzle. The ImageManager Module will handle the image and slice it into 16 pieces, 15 of which will be used to fill the initial puzzle grid.
2. The Game Starts with a 4 x 4 Grid with an empty slot and the rest of which is filled with the subimage parsed by the ImageManager. (Order Shuffled)
3. Users click any of the tile with image, if it is adjacent to the empty slot, it will be swapped with the empty slot
4. When the user successfully returns the images to its proper order, prompts the win message and returns to 1



